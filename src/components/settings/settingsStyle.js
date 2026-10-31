import styled from 'styled-components';

export const Wrapper = styled.div`
	padding: 16px 8px;
	text-align: left;
	display: flex;
	flex-direction: column;
	gap: 16px;
	animation: fadeIn 0.15s ease-out;

	@keyframes fadeIn {
		from { opacity: 0; transform: translateY(-4px); }
		to { opacity: 1; transform: translateY(0); }
	}
`;

export const Title = styled.h2`
	font-size: 18px;
	font-weight: 700;
	text-align: center;
	margin-bottom: 8px;
	color: ${({ theme }) => theme?.textColor || '#f8fafc'};
`;

export const SettingGroup = styled.div`
	display: flex;
	flex-direction: column;
	gap: 6px;
	background: ${({ theme }) => theme?.panelBg || 'rgba(15, 23, 42, 0.6)'};
	border: ${({ theme }) => theme?.panelBorder || '1px solid rgba(255, 255, 255, 0.08)'};
	border-radius: 10px;
	padding: 12px 14px;
`;

export const LabelRow = styled.div`
	display: flex;
	justify-content: space-between;
	font-size: 14px;
	font-weight: 600;
	color: ${({ theme }) => theme?.textColor || '#f8fafc'};
`;

export const ValueBadge = styled.span`
	font-weight: 800;
	color: ${({ theme }) => theme?.digitalColor || '#38bdf8'};
`;

export const ButtonRow = styled.div`
	display: flex;
	gap: 10px;
	margin-top: 10px;
`;

export const CancelButton = styled.button`
	background: rgba(255, 255, 255, 0.1);
	border: 1px solid rgba(255, 255, 255, 0.15);
	border-radius: ${({ theme }) => (theme?.cardRadius === '0px' ? '0px' : '8px')};
	color: ${({ theme }) => theme?.textColor || '#f8fafc'};
	padding: 12px;
	font-size: 14px;
	font-weight: 600;
	cursor: pointer;
	flex: 1;
	transition: background 0.15s ease;

	&:hover {
		background: rgba(255, 255, 255, 0.2);
	}
`;

export const SaveButton = styled.button`
	background: ${({ theme }) => theme?.accentColor || '#6366f1'};
	border: none;
	border-radius: ${({ theme }) => (theme?.cardRadius === '0px' ? '0px' : '8px')};
	color: #ffffff;
	padding: 12px;
	font-size: 14px;
	font-weight: 700;
	cursor: pointer;
	flex: 2;
	transition: background 0.15s ease, transform 0.08s ease;

	&:hover {
		background: ${({ theme }) => theme?.accentHover || '#4f46e5'};
	}

	&:active {
		transform: scale(0.98);
	}
`;
