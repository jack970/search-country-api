const formatNumber = (number) => {
    return (number).toLocaleString(
        undefined, { minimumFractionDigits: 0}
    )
}

export default formatNumber