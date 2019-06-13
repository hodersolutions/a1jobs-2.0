export const logAction = (store) => {
    return next => {
        return action => {
            const result = next(action);
            console.log(`Action caught: ${JSON.stringify(result)}`);
            return result;
        }
    }
}

export default logAction;