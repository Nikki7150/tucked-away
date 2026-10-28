const PALETTE = [
    // {bg: '#f9f9f9', text: '#575527'}, 
    {bg: '#ddd3c9', text: '#b97d7b'}, 
    {bg: '#ecc4c3', text: '#928e5e'}, 
    {bg: '#b97d7b', text: '#ecc4c3'}, 
    {bg: '#928e5e', text: '#f9f9f9'}, 
    {bg: '#575527', text: '#ddd3c9'},
];

export default PALETTE;

const getColorIndex = (id, colorIndex) => {
    if (typeof colorIndex === 'number') {
        return colorIndex % PALETTE.length;
    }

    let sum = 0;
    for (let i = 0; i < id.length; i++) {
        sum += id[i].charCodeAt(0);
    }
    return sum % PALETTE.length;
};

export { getColorIndex };