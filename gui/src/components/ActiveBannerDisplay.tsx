import React from 'react';
import { Box, Grid, Typography } from '@mui/material';

const styles = {
    container: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        width: '35%',
        alignItems: 'center',
        padding: 2,
    },
    headerRow: {
        display: 'flex',
        flexDirection: 'row' as const,
        alignItems: 'center',
        gap: 1,
        padding: 2,
    },
    icon: {
        height: 50,
        width: 50,
    },
} as const;

const ticketStyles = `
.ticket-wrap {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    margin-bottom: 10px;
    margin-right: 15px;
    filter: drop-shadow(0 2px 8px rgba(0,0,0,0.4));
    width: fit-content;
    cursor: pointer;
    transition: filter 0.15s ease, transform 0.15s ease;
}

.ticket-wrap:hover {
    filter: drop-shadow(0 4px 12px rgba(0,0,0,0.6));
    transform: translateX(3px);
}

.ticket-wrap.selected {
    filter: drop-shadow(0 4px 14px rgba(99, 179, 237, 0.5));
    transform: translateX(5px);
}

.ticket-stub {
    background: #0d0d1a;
    border: 1px solid #444;
    border-right: none;
    width: 36px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: visible;
    padding: 6px 0;
    flex-shrink: 0;
    transition: background 0.15s ease, border-color 0.15s ease;
}

.ticket-wrap.selected .ticket-stub {
    background: #0a1628;
    border-color: #63b3ed;
}

.ticket-stub::before,
.ticket-stub::after {
    content: '';
    position: absolute;
    right: -10px;
    width: 20px;
    height: 20px;
    background: rgba(0, 0, 0, 0.8);
    border-radius: 50%;
    z-index: 2;
}
.ticket-stub::before { top: -10px; }
.ticket-stub::after  { bottom: -10px; }

.ticket-stub-perf {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background-image: repeating-linear-gradient(
        to bottom,
        transparent 0px,
        transparent 5px,
        #555 5px,
        #555 9px
    );
}

.ticket-wrap.selected .ticket-stub-perf {
    background-image: repeating-linear-gradient(
        to bottom,
        transparent 0px,
        transparent 5px,
        #63b3ed 5px,
        #63b3ed 9px
    );
}

.ticket-stub-text {
    writing-mode: vertical-rl;
    text-orientation: mixed;
    font-size: 10px;
    letter-spacing: 1.5px;
    color: #666;
    text-transform: uppercase;
    user-select: none;
    transition: color 0.15s ease;
}

.ticket-wrap.selected .ticket-stub-text {
    color: #63b3ed;
}

.ticket-main {
    background: #1a1a2e;
    border: 1px solid #444;
    border-left: none;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    overflow: hidden;
    position: relative;
    transition: background 0.15s ease, border-color 0.15s ease;
}

.ticket-wrap.selected .ticket-main {
    background: #111827;
    border-color: #63b3ed;
}

.ticket-image-wrap {
    width: 120px;
    align-self: stretch;
    flex-shrink: 0;
    overflow: hidden;
    position: relative;
}

.ticket-image-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

.ticket-selected-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #63b3ed;
    flex-shrink: 0;
    opacity: 0;
    transition: opacity 0.15s ease;
}

.ticket-wrap.selected .ticket-selected-dot {
    opacity: 1;
}

.banner-preview {
    transition: opacity 0.2s ease;
}
.banner-preview.fading {
    opacity: 0;
}
`;

interface BannerEntry {
    label: string;
    imageSrc: string;
    bannerSrc: string;
}

interface TicketProps {
    entry: BannerEntry;
    selected: boolean;
    onClick: () => void;
}

function Ticket({ entry, selected, onClick }: TicketProps) {
    return (
        <div
            className={`ticket-wrap${selected ? ' selected' : ''}`}
            onClick={onClick}
            role="button"
            aria-pressed={selected}
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onClick()}
        >
            <div className="ticket-stub">
                <div className="ticket-stub-perf" />
                <span className="ticket-stub-text">Banner</span>
            </div>

            <div className="ticket-main">
                <div className="ticket-image-wrap">
                    <img src={entry.imageSrc} alt={entry.label} />
                </div>
            </div>
        </div>
    );
}

export default function ActiveBannerDisplay() {
    const staticBanner: BannerEntry = {
        label: 'SilverWolfLv.999',
        imageSrc: 'http://localhost:8080/images/banner/SilverWolfLv.999.png',
        bannerSrc: 'http://localhost:8080/images/banner/SilverWolfLv.999.png',
    };

    const [activeBanners] = React.useState<string[] | null>(null);

    const dynamicEntries: BannerEntry[] = (activeBanners ?? []).map((banner) => ({
        label: banner,
        imageSrc: `http://localhost:8080/images/banners/${banner.toLowerCase()}.webp`,
        bannerSrc: `http://localhost:8080/images/banners/${banner.toLowerCase()}.webp`,
    }));

    const allEntries: BannerEntry[] = [staticBanner, ...dynamicEntries];

    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [fading, setFading] = React.useState(false);
    const [displayedBanner, setDisplayedBanner] = React.useState(staticBanner.bannerSrc);

    const handleSelect = (index: number) => {
        if (index === selectedIndex) return;
        setFading(true);
        setTimeout(() => {
            setSelectedIndex(index);
            setDisplayedBanner(allEntries[index].bannerSrc);
            setFading(false);
        }, 200);
    };

    return (
        <>
            <style>{ticketStyles}</style>

            <Grid display={'flex'} flexDirection={'row'} alignItems={'stretch'}>
                <Box sx={styles.container}>

                    <div style={styles.headerRow}>
                        <img
                            style={styles.icon}
                            src={'http://localhost:8080/images/icons/Warp-Transparent.png'}
                            alt={'WarpIcon'}
                        />
                        <Typography sx={{ color: '#ccc' }}>Warp</Typography>
                    </div>

                    {allEntries.map((entry, index) => (
                        <Ticket
                            key={entry.label}
                            entry={entry}
                            selected={selectedIndex === index}
                            onClick={() => handleSelect(index)}
                        />
                    ))}
                </Box>

                <Box className={`banner-preview${fading ? ' fading' : ''}`}>
                    <img src={displayedBanner} alt={'banner preview'} />
                </Box>
            </Grid>
        </>
    );
}
