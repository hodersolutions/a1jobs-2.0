export const Random = () => {
    var max = 12;
    var min = 1;
    return Math.floor(Math.random() * (max - min + 1) + min);
};

export const DefaultDisplay = (check, alternative = null) => {
    let omits = [0, '0', null, undefined, '', 'None', 'none'];
    if (omits.indexOf(check) !== -1) {
        if(alternative === null)
            return 'N/A';
        else
            return alternative;
    }
    else
        return check;
}
