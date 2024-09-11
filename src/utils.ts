export const formatVNDate = (date: string|Date) => {
    if (date === '0000-00-00') return '';
    return new Date(date).toLocaleDateString('vi-VN') ?? '';
}