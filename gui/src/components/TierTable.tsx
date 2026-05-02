import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso, TableComponents } from 'react-virtuoso';
import Chance from 'chance';
import {useEffect} from "react";
import {getCharacters} from "../services/api";
import {CircularProgress, Typography} from "@mui/material";

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

const fetchCharacters = async () => {
    try {
        const data = await getCharacters();
        return data.map((ch: any) => ({
            name: ch.name,
            tier: ch.tier,
            rarity: ch.rarity,
            element: ch.element,
            path: ch.path,
        }));
    } catch (err) {
        return []
    }
};

const columns: ColumnData[] = [
    {
        width: 100,
        label: 'Name',
        dataKey: 'name',
    },
    {
        width: 100,
        label: 'Tier',
        dataKey: 'tier',
    },
    {
        width: 100,
        label: 'Rarity',
        dataKey: 'rarity',
    },
    {
        width: 100,
        label: 'Element',
        dataKey: 'element',
    },
    {
        width: 100,
        label: 'Path',
        dataKey: 'path',
    },
];

const rows: Data[] = await fetchCharacters();

const VirtuosoTableComponents: TableComponents<Data> = {
    Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
        <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
        <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
    ),
    TableHead: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
        <TableHead {...props} ref={ref} />
    )),
    TableRow,
    TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
        <TableBody {...props} ref={ref} />
    )),
};

function fixedHeaderContent() {

    return (
        <TableRow>
            {columns.map((column) => (
                <TableCell
                    key={column.dataKey}
                    variant="head"
                    align={column.numeric || false ? 'right' : 'left'}
                    style={{ width: column.width }}
                    sx={{ backgroundColor: 'background.paper' }}
                >
                    {column.label}
                </TableCell>
            ))}
        </TableRow>
    );
}

function rowContent(_index: number, row: Data) {
    return (
        <React.Fragment>
            {columns.map((column) => (
                <TableCell
                    key={column.dataKey}
                    align={column.numeric || false ? 'right' : 'left'}
                >
                    {row[column.dataKey]}
                </TableCell>
            ))}
        </React.Fragment>
    );
}

export default function TierTable() {
    useEffect(() => {
        fetchCharacters();
    }, []);

    return (
        <Paper style={{ height: 400, width: '100%' }}>
            <TableVirtuoso
                data={rows}
                components={VirtuosoTableComponents}
                fixedHeaderContent={fixedHeaderContent}
                itemContent={rowContent}
            />
        </Paper>
    );
}
