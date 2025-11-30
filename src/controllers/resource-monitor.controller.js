
export const heavyTask = (req, res) => {
    // Simulate a heavy task
    let sum = 0;
    let obj = {}
    for (let i = 0; i < 1e8; i++) {
        obj[i] = i;
        sum += i;
    }
    res.json({ result: sum });
};


export const getResourceData = (req, res) => {
    try {
        const data = getResourceData();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch resource data' });
    }
}