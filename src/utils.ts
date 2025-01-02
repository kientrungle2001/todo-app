export const formatVNDate = (date: string|Date) => {
    if (date === '0000-00-00') return '';
    let dateValue = new Date(date);
    if (dateValue.toString() === 'Invalid Date' || isNaN(dateValue.getTime())) {
        return '-';
    }
    return dateValue.toLocaleDateString('vi-VN') ?? '';
}