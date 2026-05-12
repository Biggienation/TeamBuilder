import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
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
    SS: 0,
    S:  1,
    A:  2,
    B:  3,
    C:  4,
    D:  5,
    E:  6,
};

const ROW_HEIGHT = 52;
const HEADER_HEIGHT = 56;
const MAX_TABLE_HEIGHT = 400;

const BG = 'rgba(20, 27, 45, 0.9)';
const BG_HEADER = 'rgba(12, 17, 32, 0.98)';

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

const columns: ColumnData[] = [
    { width: 120, label: 'Name',    dataKey: 'name'    },
    { width: 80,  label: 'Tier',    dataKey: 'tier'    },
    { width: 80,  label: 'Rarity',  dataKey: 'rarity'  },
    { width: 100, label: 'Element', dataKey: 'element' },
    { width: 100, label: 'Path',    dataKey: 'path'    },
];

const cellSx = {
    color: 'white',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
    backgroundColor: BG,
};

const headCellSx = {
    color: 'white',
    borderBottom: '1px solid rgba(255,255,255,0.15)',
    backgroundColor: BG_HEADER,
    fontWeight: 600,
    letterSpacing: '0.04em',
    '& .MuiTableSortLabel-root': { color: 'rgba(255,255,255,0.7)' },
    '& .MuiTableSortLabel-root:hover': { color: 'white' },
    '& .MuiTableSortLabel-root.Mui-active': { color: 'white' },
    '& .MuiTableSortLabel-icon': { color: 'white !important' },
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
            <TableContainer
                component={Paper}
                {...props}
                ref={ref}
                sx={{
                    backgroundColor: 'transparent',
                    backgroundImage: 'none',
                    boxShadow: 'none',
                    scrollbarWidth: 'none',
                    '&::-webkit-scrollbar': { display: 'none' },
                }}
            />
        )),
        Table: (props) => (
            <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
        ),
        TableHead: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
            <TableHead {...props} ref={ref} />
        )),
        TableRow: ({ item: _item, ...props }) => (
            <TableRow
                {...props}
                sx={{ '&:hover': { backgroundColor: 'rgba(255,255,255,0.04)' } }}
            />
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
                        sx={headCellSx}
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
                    <TableCell
                        key={col.dataKey}
                        align={col.numeric ? 'right' : 'left'}
                        sx={cellSx}
                    >
                        {row[col.dataKey]}
                    </TableCell>
                ))}
            </React.Fragment>
        );
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <div style={{ width: '80%' }}>
                <div style={{
                    backgroundColor: BG_HEADER,
                    padding: '12px 16px',
                    borderBottom: '1px solid rgba(255,255,255,0.15)',
                }}>
                    <h2 style={{ color: 'white', margin: 0, fontSize: 18, fontWeight: 600 }}>Tier List</h2>
                </div>

                <Paper elevation={0} style={{ width: '100%', backgroundColor: BG, backgroundImage: 'none' }}>
                    <TableVirtuoso
                        data={sorted}
                        style={{ height: tableHeight }}
                        components={VirtuosoTableComponents}
                        fixedHeaderContent={fixedHeaderContent}
                        itemContent={rowContent}
                    />
                </Paper>
            </div>
        </div>
    );
}
