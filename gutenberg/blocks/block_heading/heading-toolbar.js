/**
 * External dependencies
 */
import { range } from 'lodash';

// Block dependencies
import icons from '../../../js/icons.js';

/**
 * WordPress dependencies
 */
const { __, sprintf } = wp.i18n;
const { Component } = wp.element;
const { Toolbar } = wp.components;

class HeadingToolbar extends Component {
	createLevelControl( targetLevel, selectedLevel, onChange ) {
		return {
			icon: icons.heading,
			// translators: %s: heading level e.g: "1", "2", "3"
			title: sprintf( __( 'Heading %d' ), targetLevel ),
			isActive: targetLevel === selectedLevel,
			onClick: () => onChange( targetLevel ),
			subscript: String( targetLevel ),
		};
	}

	render() {
		const { minLevel, maxLevel, selectedLevel, onChange } = this.props;

		return (
			<Toolbar controls={ range( minLevel, maxLevel ).map( ( index ) => this.createLevelControl( index, selectedLevel, onChange ) ) } />
		);

		// Not sure why this was in here but it was breaking the heading level toolbar.
		// Above version is working @ 12/13/22. -DP
		// <Toolbar label="Levels" controls={ range( minLevel, maxLevel ).map( ( index ) => this.createLevelControl( index, selectedLevel, onChange ) ) } />
	}
}

export default HeadingToolbar;