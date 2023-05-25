export const makeBlockLabel = (
	label: string,
	icon: string,
) => `
	<div class="flex flex-col items-center justify-center">
		<i class="ti ti-${icon} text-2xl mb-2"></i>
		<span class="text-sm">${label}</span>
	</div>
`;