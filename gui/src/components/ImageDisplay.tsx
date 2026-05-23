import React from "react";
import { Box, ImageList, ImageListItem } from "@mui/material";

export function ImageDisplay() {

    function srcset(image: string, size: number, rows = 1, cols = 1) {
        return {
            src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
            srcSet: `${image}?w=${size * cols}&h=${
                size * rows
            }&fit=crop&auto=format&dpr=2 2x`,
        };
    }
    const itemData = [
        {
            img: 'https://static.wikia.nocookie.net/houkai-star-rail/images/1/16/Area_Duomension_City.png/revision/latest/scale-to-width-down/300?cb=20260206134133',
            title: 'Duomension City',
            rows: 2,
            cols: 2,
        },
        {
            img: 'https://static.wikia.nocookie.net/houkai-star-rail/images/0/04/Area_Graphia_Academy.png/revision/latest/scale-to-width-down/300?cb=20260214161112',
            title: 'Graphia Academy',
        },
        {
            img: 'https://static.wikia.nocookie.net/houkai-star-rail/images/8/8d/Area_Pearluxe_Tower.png/revision/latest/scale-to-width-down/300?cb=20260325103153',
            title: 'Pearluxe Tower',
        },
        {
            img: 'https://static.wikia.nocookie.net/houkai-star-rail/images/c/cd/Area_Seafeld_City.png/revision/latest/scale-to-width-down/300?cb=20260426063421',
            title: 'Seafeld City',
            cols: 2,
        },
        {
            img: 'https://static.wikia.nocookie.net/houkai-star-rail/images/1/10/Area_Lookout_Cloud_Station.png/revision/latest/scale-to-width-down/300?cb=20260325105426',
            title: 'Lookout Cloud Station',
            cols: 2,
        },
        {
            img: 'https://static.wikia.nocookie.net/houkai-star-rail/images/3/3a/Area_Dovebrook_District.png/revision/latest/scale-to-width-down/300?cb=20260206134224',
            title: 'Dovebrook District',
            rows: 2,
            cols: 2,
        },
        {
            img: 'https://static.wikia.nocookie.net/houkai-star-rail/images/7/76/Area_Phantasmoon_Courtyard.png/revision/latest/scale-to-width-down/300?cb=20260213144741',
            title: 'Phantasmoon Courtyard',
        },
        {
            img: 'https://static.wikia.nocookie.net/houkai-star-rail/images/a/a9/Area_%22World%27s_End%22_Tavern.png/revision/latest/scale-to-width-down/300?cb=20260220114308',
            title: '"World\'s End" Tavern',
        },
    ];


    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', height: 600, overflow: 'hidden', paddingTop: 5}}>
        <ImageList
            sx={{ width: 1000, height: 500 }}
            variant="quilted"
            cols={4}
            rowHeight={121}
        >
            {itemData.map((item) => (
                <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
                    <img
                        {...srcset(item.img, 121, item.rows, item.cols)}
                        alt={item.title}
                        loading="lazy"
                    />
                </ImageListItem>
            ))}
        </ImageList>
        </Box>
    );
}
