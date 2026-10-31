import React from 'react';
import { MIN_WIDTH, MAX_WIDTH, MIN_HEIGHT, MAX_HEIGHT, MIN_MINES } from '../../constants';
import { Slider } from '../shared';
import {
	Wrapper,
	Title,
	SettingGroup,
	LabelRow,
	ValueBadge,
	ButtonRow,
	CancelButton,
	SaveButton
} from './settingsStyle';

const Settings = ({
	width,
	height,
	mineCount,
	maxMineCount,
	theme,
	onChangeWidth,
	onChangeHeight,
	onChangeMines,
	onClickSet,
	onClickCancel
}) => {
	return (
		<Wrapper>
			<Title theme={theme}>Custom Board Settings</Title>

			<SettingGroup theme={theme}>
				<LabelRow theme={theme}>
					<span>Width (columns)</span>
					<ValueBadge theme={theme}>{width}</ValueBadge>
				</LabelRow>
				<Slider
					min={MIN_WIDTH}
					max={MAX_WIDTH}
					value={width}
					onChange={onChangeWidth}
				/>
			</SettingGroup>

			<SettingGroup theme={theme}>
				<LabelRow theme={theme}>
					<span>Height (rows)</span>
					<ValueBadge theme={theme}>{height}</ValueBadge>
				</LabelRow>
				<Slider
					min={MIN_HEIGHT}
					max={MAX_HEIGHT}
					value={height}
					onChange={onChangeHeight}
				/>
			</SettingGroup>

			<SettingGroup theme={theme}>
				<LabelRow theme={theme}>
					<span>Mines</span>
					<ValueBadge theme={theme}>{mineCount}</ValueBadge>
				</LabelRow>
				<Slider
					min={MIN_MINES}
					max={maxMineCount}
					value={mineCount}
					onChange={onChangeMines}
				/>
			</SettingGroup>

			<ButtonRow>
				<CancelButton theme={theme} onClick={onClickCancel}>
					Cancel
				</CancelButton>
				<SaveButton theme={theme} onClick={onClickSet}>
					Start Game
				</SaveButton>
			</ButtonRow>
		</Wrapper>
	);
};

export default Settings;
