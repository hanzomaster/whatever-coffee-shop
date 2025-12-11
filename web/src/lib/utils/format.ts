export function formatCurrency(value: number | string): string {
	const num = typeof value === 'string' ? parseFloat(value) : value;
	return new Intl.NumberFormat('vi-VN', {
		style: 'currency',
		currency: 'VND',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0
	}).format(num);
}

export function formatDate(date: string | Date): string {
	const d = typeof date === 'string' ? new Date(date) : date;
	return new Intl.DateTimeFormat('vi-VN', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit'
	}).format(d);
}

export function formatDateTime(date: string | Date): string {
	const d = typeof date === 'string' ? new Date(date) : date;
	return new Intl.DateTimeFormat('vi-VN', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit'
	}).format(d);
}

export function formatPhone(phone: string): string {
	if (!phone) return '';
	// Format Vietnamese phone number
	if (phone.startsWith('+84')) {
		return phone.replace(/(\+84)(\d{2})(\d{3})(\d{4})/, '$1 $2 $3 $4');
	}
	if (phone.startsWith('0')) {
		return phone.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
	}
	return phone;
}
