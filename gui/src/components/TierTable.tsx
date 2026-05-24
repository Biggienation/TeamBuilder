import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import { Box, Typography } from '@mui/material';
import { TableVirtuoso, TableComponents } from 'react-virtuoso';
import { useEffect, useState } from 'react';
import { getCharacters } from '../services/characterApi';

interface Data {
    name: string;
    tier: string;
    rarity: string;
    element: string;
    path: string;
}

interface ColumnData {
    dataKey: keyof Data;
    label: string;
    numeric?: boolean;
    width?: number;
}

type Order = 'asc' | 'desc';

const TIER_ORDER: Record<string, number> = {
    SS: 0, S: 1, A: 2, B: 3, C: 4, D: 5, E: 6,
};

const ROW_HEIGHT = 52;
const HEADER_HEIGHT = 56;
const MAX_TABLE_HEIGHT = 800;

const columns: ColumnData[] = [
    { width: 120, label: 'Name',    dataKey: 'name'    },
    { width: 80,  label: 'Tier',    dataKey: 'tier'    },
    { width: 80,  label: 'Rarity',  dataKey: 'rarity'  },
    { width: 100, label: 'Element', dataKey: 'element' },
    { width: 100, label: 'Path',    dataKey: 'path'    },
];

const styles = {
    outerWrapper: {
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        width: '100%',
        padding: '24px 0',
    },
    container: {
        width: '80%',
        backgroundColor: '#e0e0e0',
        borderRadius: '6px',
        border: '1px solid #bbb',
        boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
        overflow: 'hidden',
    },
    tableHeader: {
        backgroundColor: '#d8d8d8',
        padding: '12px 16px',
        borderBottom: '1px solid #ccc',
    },
    tableTitle: {
        color: '#111',
        fontWeight: 700,
        fontSize: '1.1rem',
    },
    tablePaper: {
        width: '100%',
        backgroundColor: '#f0f0f0',
        backgroundImage: 'none',
        borderRadius: 0,
    },
    scroller: {
        backgroundColor: 'transparent',
        backgroundImage: 'none',
        boxShadow: 'none',
        scrollbarWidth: 'none' as const,
        '&::-webkit-scrollbar': { display: 'none' },
    },
    tableRow: {
        '&:hover': { backgroundColor: '#e8e8e8' },
    },
    cellSx: {
        color: '#222',
        borderBottom: '1px solid #ccc',
        backgroundColor: '#f0f0f0',
    },
    headCellSx: {
        color: '#111',
        borderBottom: '1px solid #ccc',
        backgroundColor: '#d8d8d8',
        fontWeight: 700,
        letterSpacing: '0.04em',
        '& .MuiTableSortLabel-root': { color: '#444' },
        '& .MuiTableSortLabel-root:hover': { color: '#111' },
        '& .MuiTableSortLabel-root.Mui-active': { color: '#111' },
        '& .MuiTableSortLabel-icon': { color: '#444 !important' },
    },
};

const fetchCharacters = async (): Promise<Data[]> => {
    try {
        const data = await getCharacters();
        return data.map((ch: any) => ({
            name: ch.name,
            tier: ch.tier,
            rarity: ch.rarity,
            element: ch.element,
            path: ch.path,
        }));
    } catch {
        return [];
    }
};

function compareRows(a: Data, b: Data, orderBy: keyof Data): number {
    if (orderBy === 'tier') {
        const ta = TIER_ORDER[a.tier] ?? 99;
        const tb = TIER_ORDER[b.tier] ?? 99;
        return ta - tb;
    }
    const av = a[orderBy] ?? '';
    const bv = b[orderBy] ?? '';
    return av < bv ? -1 : av > bv ? 1 : 0;
}

function sortedRows(data: Data[], order: Order, orderBy: keyof Data): Data[] {
    return [...data].sort((a, b) => {
        const cmp = compareRows(a, b, orderBy);
        return order === 'asc' ? cmp : -cmp;
    });
}

export default function TierTable() {
    const [rows, setRows] = useState<Data[]>([]);
    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<keyof Data>('tier');

    useEffect(() => {
        fetchCharacters().then(setRows);
    }, []);

    const handleSort = (key: keyof Data) => {
        if (orderBy === key) {
            setOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
        } else {
            setOrderBy(key);
            setOrder('asc');
        }
    };

    const sorted = sortedRows(rows, order, orderBy);
    const tableHeight = Math.min(sorted.length * ROW_HEIGHT + HEADER_HEIGHT, MAX_TABLE_HEIGHT);

    const VirtuosoTableComponents: TableComponents<Data> = {
        Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
            <TableContainer component={Paper} {...props} ref={ref} sx={styles.scroller} />
        )),
        Table: (props) => (
            <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
        ),
        TableHead: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
            <TableHead {...props} ref={ref} />
        )),
        TableRow: ({ item: _item, ...props }) => (
            <TableRow {...props} sx={styles.tableRow} />
        ),
        TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
            <TableBody {...props} ref={ref} />
        )),
    };

    function fixedHeaderContent() {
        return (
            <TableRow>
                {columns.map((col) => (
                    <TableCell
                        key={col.dataKey}
                        variant="head"
                        align={col.numeric ? 'right' : 'left'}
                        style={{ width: col.width }}
                        sx={styles.headCellSx}
                        sortDirection={orderBy === col.dataKey ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === col.dataKey}
                            direction={orderBy === col.dataKey ? order : 'asc'}
                            onClick={() => handleSort(col.dataKey)}
                        >
                            {col.label}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        );
    }

    function rowContent(_index: number, row: Data) {
        return (
            <React.Fragment>
                {columns.map((col) => (
                    <TableCell key={col.dataKey} align={col.numeric ? 'right' : 'left'} sx={styles.cellSx}>
                        {row[col.dataKey]}
                    </TableCell>
                ))}
            </React.Fragment>
        );
    }

    return (
        <Box sx={styles.outerWrapper}>
            <Box sx={styles.container}>
                <Box sx={styles.tableHeader}>
                    <Typography sx={styles.tableTitle}>Tier List</Typography>
                </Box>
                <Paper elevation={0} sx={styles.tablePaper}>
                    <TableVirtuoso
                        data={sorted}
                        style={{ height: tableHeight }}
                        components={VirtuosoTableComponents}
                        fixedHeaderContent={fixedHeaderContent}
                        itemContent={rowContent}
                    />
                </Paper>
            </Box>
        </Box>
    );
}
