import React, { CSSProperties, forwardRef, useMemo } from 'react';
import cn from 'classnames';
import styles from './Container.module.scss';

const REM_RANGE_SIZE = 5;
const REM_RANGE = Array(REM_RANGE_SIZE).fill(null);

// Define all generic Container Props here –– things that may be used for Flex, Grid, or just plain Containers
export type ContainerProps = JSX.IntrinsicElements['div'] & {
	backgroundColor?: 'white' | 'gray';
	/** Remove default border when `backgroundColor` is set */
	noBorder?: boolean;
	position?: CSSProperties['position'];
	hoverable?: boolean;
	/** Set gap size in REM, with formula n => (2^n)/10 */
	gap?: number;
	/** Set padding size in REM, with formula n => (2^n)/10 */
	pad?: number;
	/** Set margin size as 'auto' or in REM, with formula n => (2^n)/10 */
	margin?: number | 'auto';
	/** Set border radius size in REM, with formula n => (2^n)/10 */
	borderRadius?: number;
	/** Fill Container Vertically */
	fullHeight?: boolean;
	/** Fill Container Horizontally */
	fullWidth?: boolean;
	/** Fill Container, but don't grow beyond 1184px */
	maxWidth?: boolean;
	/** Set height: 100vh */
	maxHeight?: boolean;
	/** Hug Contents */
	fitWidth?: boolean;
};

// Put the class name logic into a Hook so that the Flex component can get the correct styles from props
export const useContainerClasses = ({
	backgroundColor,
	borderRadius,
	className,
	hoverable,
	position,
	fullHeight,
	fullWidth,
	maxWidth,
	maxHeight,
	fitWidth,
	pad,
	margin,
	gap,
	noBorder = false,
}: ContainerProps) => {
	const classes = useMemo(() => cn(styles['container'], className, {
		[styles['container--white']]: backgroundColor === 'white',
		[styles['container--gray']]: backgroundColor === 'gray',
		[styles['container--noborder']]: noBorder,
		[styles['container--hoverable']]: hoverable,
		[styles['container--relative']]: position === 'relative',
		[styles['container--absolute']]: position === 'absolute',
		[styles['container--fullHeight']]: fullHeight,
		[styles['container--fullWidth']]: fullWidth,
		[styles['container--maxWidth']]: maxWidth,
		[styles['container--maxHeight']]: maxHeight,
		[styles['container--fitWidth']]: fitWidth,
		[styles['container--autoMargin']]: margin === 'auto',
		...Object.fromEntries(REM_RANGE.map((_, i) => [styles[`container--${i + 1}padding`], pad === i + 1])),
		...Object.fromEntries(REM_RANGE.map((_, i) => [styles[`container--${i + 1}margin`], margin === i + 1])),
		...Object.fromEntries(REM_RANGE.map((_, i) => [styles[`container--${i + 1}gap`], gap === i + 1])),
		...Object.fromEntries(REM_RANGE.map((_, i) => [styles[`container--${i + 1}border-radius`], borderRadius === i + 1])),
	}), [backgroundColor, borderRadius, className, fitWidth, fullHeight, fullWidth, gap, hoverable, margin, maxHeight, maxWidth, noBorder, pad, position]);

	return classes;
};

const Container = forwardRef<HTMLDivElement, ContainerProps>(({ children, className, ...rest }, ref) => {
	const classes = useContainerClasses({ className, ...rest });

	const domSafeProps = Object.assign({}, rest);
	delete domSafeProps.backgroundColor;
	delete domSafeProps.borderRadius;
	delete domSafeProps.fitWidth;
	delete domSafeProps.fullHeight;
	delete domSafeProps.fullWidth;
	delete domSafeProps.gap;
	delete domSafeProps.hoverable;
	delete domSafeProps.margin;
	delete domSafeProps.maxHeight;
	delete domSafeProps.maxWidth;
	delete domSafeProps.noBorder;
	delete domSafeProps.pad;
	delete domSafeProps.noBorder;

	return (
		<div ref={ref} className={classes} {...domSafeProps}>
			{children}
		</div>
	);
});

Container.displayName = 'Container';

export default Container;
