import React from 'react';
import { Box, FormControl, FormControlLabel, FormLabel, Button, Checkbox } from '@mui/material';

const styles = {
    filterWrapper: {
        backgroundColor: '#f0f0f0',
        borderRadius: '0px 0px 0px 0px',
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column' as const,
        overflowY: 'auto' as const,
    },
    filterContainer: {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: 3,
        padding: '24px 16px',
        flex: 1,
        overflowY: 'auto' as const,
    },
    sectionLabel: {
        color: '#222',
        fontWeight: 'bold',
        fontSize: '0.85rem',
        mb: 1,
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        '&::before': {
            content: '"•"',
        },
    },
    checkboxLabel: {
        backgroundColor: '#fff',
        display: 'flex',
        alignItems: 'center',
        padding: '4px 10px',
        marginBottom: '4px',
        borderRadius: '4px',
        border: '1px solid #ddd',
        cursor: 'pointer',
        '&:hover': {
            borderColor: '#bbb',
        },
    },
    checkbox: {
        color: '#ddd',
        '&.Mui-checked': {
            color: '#f9c95e',
        },
        padding: '4px',
    },
    image: {
        height: 20,
        width: 20,
        marginRight: 10,
        flexShrink: 0,
    },
    formControl: {
        borderBottom: '1px solid #ddd',
        paddingBottom: 2,
        width: '100%',
    },
    bottomBar: {
        backgroundColor: '#3a3a3a',
        padding: '16px 24px',
        display: 'flex',
        justifyContent: 'center',
        gap: 2,
        borderTop: '1px solid #2a2a2a',
        flexShrink: 0,
    },
    clearButton: {
        backgroundColor: '#fff',
        color: '#222',
        borderColor: '#666',
        borderRadius: '20px',
        textTransform: 'none' as const,
        flex: 1,
        py: 1,
        display: 'flex',
        gap: 1,
        '&:hover': {
            border: '3px solid white',
            backgroundColor: '#white',
            color: '#222',
        },
    },
} as const;

interface CharacterFiltersProps {
    elementFilter: string[];
    roleFilter: string[];
    pathFilter: string[];
    onElementFilterChange: (value: string[]) => void;
    onRoleFilterChange: (value: string[]) => void;
    onPathFilterChange: (value: string[]) => void;
    onClearFilters: () => void;
    elementOptions: string[];
    roleOptions: string[];
    pathOptions: string[];
}

function getPathIcon(path: string) {
    return 'http://localhost:8080/images/path/' + path + '.webp';
}

function getElementIcon(element: string) {
    return 'http://localhost:8080/images/element/' + element + '.webp';
}

function toggleValue(arr: string[], value: string): string[] {
    return arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
}

export default function CharacterFilters({
                                             elementFilter,
                                             roleFilter,
                                             pathFilter,
                                             onElementFilterChange,
                                             onRoleFilterChange,
                                             onPathFilterChange,
                                             onClearFilters,
                                             elementOptions,
                                             roleOptions,
                                             pathOptions,
                                         }: CharacterFiltersProps) {
    return (
        <Box sx={styles.filterWrapper}>

            {/* Scrollable filter content */}
            <Box sx={styles.filterContainer}>

                {/* Path */}
                <FormControl component="fieldset" sx={styles.formControl}>
                    <FormLabel component="legend" sx={styles.sectionLabel}>Path</FormLabel>
                    {pathOptions.filter((p) => p !== 'All').map((path) => (
                        <Box key={path} sx={styles.checkboxLabel}>
                            <img src={getPathIcon(path)} alt={path} style={styles.image} />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        size="small"
                                        sx={styles.checkbox}
                                        checked={pathFilter.includes(path)}
                                        onChange={() => onPathFilterChange(toggleValue(pathFilter, path))}
                                    />
                                }
                                label={path}
                                sx={{ margin: 0, flex: 1, flexDirection: 'row-reverse', justifyContent: 'space-between' }}
                            />
                        </Box>
                    ))}
                </FormControl>

                {/* Element */}
                <FormControl component="fieldset" sx={styles.formControl}>
                    <FormLabel component="legend" sx={styles.sectionLabel}>Element</FormLabel>
                    {elementOptions.filter((e) => e !== 'All').map((element) => (
                        <Box key={element} sx={styles.checkboxLabel}>
                            <img src={getElementIcon(element)} alt={element} style={styles.image} />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        size="small"
                                        sx={styles.checkbox}
                                        checked={elementFilter.includes(element)}
                                        onChange={() => onElementFilterChange(toggleValue(elementFilter, element))}
                                    />
                                }
                                label={element}
                                sx={{ margin: 0, flex: 1, flexDirection: 'row-reverse', justifyContent: 'space-between' }}
                            />
                        </Box>
                    ))}
                </FormControl>

                {/* Role */}
                <FormControl component="fieldset" sx={styles.formControl}>
                    <FormLabel component="legend" sx={styles.sectionLabel}>Role</FormLabel>
                    {roleOptions.filter((r) => r !== 'All').map((role) => (
                        <Box key={role} sx={styles.checkboxLabel}>
                            <div style={styles.image} />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        size="small"
                                        sx={styles.checkbox}
                                        checked={roleFilter.includes(role)}
                                        onChange={() => onRoleFilterChange(toggleValue(roleFilter, role))}
                                    />
                                }
                                label={role}
                                sx={{ margin: 0, flex: 1, flexDirection: 'row-reverse', justifyContent: 'space-between' }}
                            />
                        </Box>
                    ))}
                </FormControl>

            </Box>

            <Box sx={styles.bottomBar}>
                <Button variant="outlined" onClick={onClearFilters} sx={styles.clearButton}>
                    ✕ Clear All
                </Button>
            </Box>

        </Box>
    );
}
