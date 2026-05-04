import React from 'react';
import { Box, FormControl, Radio, RadioGroup, FormControlLabel, FormLabel, Button } from '@mui/material';
import GreenSpacer from "components/GreenSpacer";

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
    <Box sx={{ width: 300, flexShrink: 0, paddingRight: 2, borderRight: '1px solid #ccc' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <FormControl component="fieldset">
          <FormLabel component="legend" sx={{ color: 'text.primary', fontWeight: 'bold', marginBottom: 1 }}>Element</FormLabel>
          <RadioGroup
            value={elementFilter}
            onChange={(e) => onElementFilterChange(e.target.value)}
          >
            {elementOptions.map((element) => (
              <FormControlLabel key={element} value={element} control={<Radio size="small" />} label={element} />
            ))}
          </RadioGroup>
        </FormControl>
          <GreenSpacer/>

        <FormControl component="fieldset">
          <FormLabel component="legend" sx={{ color: 'text.primary', fontWeight: 'bold', marginBottom: 1 }}>Role</FormLabel>
          <RadioGroup
            value={roleFilter}
            onChange={(e) => onRoleFilterChange(e.target.value)}
          >
            {roleOptions.map((role) => (
              <FormControlLabel key={role} value={role} control={<Radio size="small" />} label={role} />
            ))}
          </RadioGroup>
        </FormControl>
          <GreenSpacer/>

        <FormControl component="fieldset">
          <FormLabel component="legend" sx={{ color: 'text.primary', fontWeight: 'bold', marginBottom: 1 }}>Path</FormLabel>
          <RadioGroup
            value={pathFilter}
            onChange={(e) => onPathFilterChange(e.target.value)}
          >
            {pathOptions.map((path) => (
              <FormControlLabel key={path} value={path} control={<Radio size="small" />} label={path} />
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
