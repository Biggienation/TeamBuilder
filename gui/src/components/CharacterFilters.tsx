import React from 'react';
import { Box, FormControl, Radio, RadioGroup, FormControlLabel, FormLabel, Button } from '@mui/material';

const styles = {
  filterWrapper: {
      backgroundColor: '#808080',
    flexShrink: 0,

    borderRight: '1px solid #ccc',
  },
    filterContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        alignItems: 'center',
    },
    radioLabel: {
        backgroundColor: '#676767',
        display : 'flex',
        alignItems: 'center',
        padding: '4px 8px',
        radius: 4,
        marginBottom: '1px',
        elevation: 5,
        borderRadius: 4,
        border : '1px solid #4B4B4C',
    },
    formLabel: {
        color: 'text.primary',
        fontWeight: 'bold',
        marginBottom: 1
    },
    image : {
        height: 20,
        width: 20,
        marginRight: 20
    }
} as const;


interface CharacterFiltersProps {
  elementFilter: string;
  roleFilter: string;
  pathFilter: string;
  onElementFilterChange: (value: string) => void;
  onRoleFilterChange: (value: string) => void;
  onPathFilterChange: (value: string) => void;
  onClearFilters: () => void;
  elementOptions: string[];
  roleOptions: string[];
  pathOptions: string[];
}

function getPathIcon(path: string) {
    return "http://localhost:8080/images/paths/" + path.toLowerCase() + ".webp";
}

function getElementIcon(element: string) {
    return "http://localhost:8080/images/elements/" + element.toLowerCase() + ".webp";
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
      <Box sx={styles.filterContainer}>

          <FormControl component="fieldset" sx={{borderBottom: 1, borderColor: 'divider', paddingBottom: 2}}>
              <FormLabel component="legend" sx={styles.formLabel}>Path</FormLabel>
              <RadioGroup
                  value={pathFilter}
                  onChange={(e) => onPathFilterChange(e.target.value)}
              >
                  {pathOptions.map((path) => (
                      <div key={path} style={styles.radioLabel}>
                          {path !== 'All' ?  <img src={getPathIcon(path)} alt={path} style={styles.image}/> : <div style={styles.image}/>}
                          <FormControlLabel key={path} value={path} control={<Radio size="small" />} label={path}/>
                      </div>
                  ))}
              </RadioGroup>
          </FormControl>

        <FormControl component="fieldset" sx={{borderBottom: 1, borderColor: 'divider', paddingBottom: 2}}>
          <FormLabel component="legend" sx={styles.formLabel}>Element</FormLabel>
          <RadioGroup
            value={elementFilter}
            onChange={(e) => onElementFilterChange(e.target.value)}
          >
            {elementOptions.map((element) => (
                <div key={element} style={styles.radioLabel}>
                    {element !== 'All' ? <img src={getElementIcon(element)} alt={element} style={styles.image}/> : <div style={styles.image}/>}
              <FormControlLabel key={element} value={element} control={<Radio size="small" />} label={element}/>
                </div>
            ))}
          </RadioGroup>
        </FormControl>

        <FormControl component="fieldset" sx={{borderBottom: 1, borderColor: 'divider', paddingBottom: 2}}>
          <FormLabel component="legend" sx={styles.formLabel}>Role</FormLabel>
          <RadioGroup
            value={roleFilter}
            onChange={(e) => onRoleFilterChange(e.target.value)}
          >
            {roleOptions.map((role) => (
                <div key={role} style={styles.radioLabel}>
                    <div style={styles.image}/>
              <FormControlLabel key={role} value={role} control={<Radio size="small"/>} label={role}/>
                </div>
            ))}
          </RadioGroup>
        </FormControl>

        <Button
          variant="outlined"
          onClick={onClearFilters}
          size="small"
          sx={{ color: '#7E8C54', borderColor: '#7E8C54', '&:hover': { borderColor: '#ABD726', color: '#ABD726' }, alignSelf: 'flex-start' }}
        >
          Clear Filters
        </Button>
      </Box>
    </Box>
  );
}
