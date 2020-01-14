const Random = () => {
    var max = 12;
    var min = 1;
    return Math.floor(Math.random() * (max - min + 1) + min);
};

export default Random;