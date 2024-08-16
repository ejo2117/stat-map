import React, { forwardRef, memo } from 'react';
import cn from 'classnames';
import { ContainerProps, useContainerClasses } from '../Container/Container';
import styles from './Flex.module.scss';

export type FlexProps = JSX.IntrinsicElements['div'] &
	ContainerProps & {
		column?: boolean | 'sm' | 'md' | 'lg' | 'xl';
		row?: boolean | 'sm' | 'md' | 'lg' | 'xl';
		align?: 'center' | 'start' | 'end' | 'baseline' | 'normal';
		justify?: 'center' | 'start' | 'end' | 'between' | 'around' | 'evenly' | 'normal';
		/** align center, justify center */
		center?: boolean;
	};

const Flex = forwardRef<HTMLDivElement, FlexProps>(
	({ children, className, column = false, row = true, align = 'normal', justify = 'normal', center, style, ...rest }, ref) => {
		const containerClasses = useContainerClasses(rest);

		const classes = cn(styles['container'], className, containerClasses, {
			[styles['container--row']]: row && typeof row === 'boolean' && !column,
			[styles['container--rowSm']]: row === 'sm',
			[styles['container--rowMd']]: row === 'md',
			[styles['container--rowLg']]: row === 'lg',
			[styles['container--rowXl']]: row === 'xl',
			[styles['container--column']]: column && typeof column === 'boolean',
			[styles['container--columnSm']]: column === 'sm',
			[styles['container--columnMd']]: column === 'md',
			[styles['container--columnLg']]: column === 'lg',
			[styles['container--columnXl']]: column === 'xl',
			[styles['container--alignCenter']]: align === 'center' || center,
			[styles['container--alignStart']]: align === 'start',
			[styles['container--alignEnd']]: align === 'end',
			[styles['container--alignBaseline']]: align === 'baseline',
			[styles['container--justifyCenter']]: justify === 'center' || center,
			[styles['container--justifyStart']]: justify === 'start',
			[styles['container--justifyEnd']]: justify === 'end',
			[styles['container--justifyBetween']]: justify === 'between',
			[styles['container--justifyAround']]: justify === 'around',
			[styles['container--justifyEvenly']]: justify === 'evenly',
		});

		// ! Better approaches are welcomed !
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { fullWidth, fullHeight, backgroundColor, borderRadius, noBorder, maxWidth, fitWidth, ...domSafeProps } = rest;

		return (
			<div className={classes} ref={ref} style={style} {...domSafeProps}>
				{children}
			</div>
		);
	}
);

Flex.displayName = 'Flex';

export default memo(Flex);
