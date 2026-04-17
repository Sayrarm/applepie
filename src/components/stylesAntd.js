export const stylesFnSearch = info => {
    if (info.props.size === 'medium') {
        return {
            root: { color: '#2b1611' },
            input: { color: '#2b1611', borderColor: '#2b1611' },
            prefix: { color: '#2b1611' },
            suffix: { color: '#2b1611' },
            count: { color: '#2b1611' },
            button: {
                root: { color: '#2b1611', borderColor: '#2b1611' },
                icon: { color: '#2b1611' },
            },
        };
    }
    return {};
};