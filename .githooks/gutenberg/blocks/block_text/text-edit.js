/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';
import { BACKSPACE, DELETE, F10 } from '@wordpress/keycodes';
import classnames from 'classnames';

const { wp } = window;
const { __ } = wp.i18n;
const {
	InspectorControls,
	InnerBlocks,
} = wp.blockEditor;

// Import all of our Margin Options requirements.
import MarginOptions, { MarginOptionsAttributes, MarginOptionsClasses } from '../../components/gb-component_margin';
// Import all of our Padding Options requirements.
import PaddingOptions, { PaddingOptionsAttributes, PaddingOptionsClasses } from '../../components/gb-component_padding';
// Import all of our Border Options requirements.
import BorderOptions, { BorderOptionsAttributes, BorderOptionsClasses } from '../../components/gb-component_border';
// Import all of our Background Options requirements.
import BackgroundColorOptions, { BackgroundColorOptionsAttributes, BackgroundColorOptionsInlineStyles } from '../../components/gb-component_background-color';


function isTmceEmpty( editor ) {
	// When tinyMce is empty the content seems to be:
	// <p><br data-mce-bogus="1"></p>
	// avoid expensive checks for large documents
	const body = editor.getBody();
	if ( body.childNodes.length > 1 ) {
		return false;
	} else if ( body.childNodes.length === 0 ) {
		return true;
	}
	if ( body.childNodes[ 0 ].childNodes.length > 1 ) {
		return false;
	}
	return /^\n?$/.test( body.innerText || body.textContent );
}

export default class ClassicEdit extends Component {
	constructor( props ) {
		super( props );
		this.initialize = this.initialize.bind( this );
		this.onSetup = this.onSetup.bind( this );
		this.focus = this.focus.bind( this );
	}

	componentDidMount() {
		const { baseURL, suffix } = window.wpEditorL10n.tinymce;

		window.tinymce.EditorManager.overrideDefaults( {
			base_url: baseURL,
			suffix,
		} );

		if ( document.readyState === 'complete' ) {
			this.initialize();
		} else {
			window.addEventListener( 'DOMContentLoaded', this.initialize );
		}
	}

	componentWillUnmount() {
		window.addEventListener( 'DOMContentLoaded', this.initialize );
		wp.oldEditor.remove( `editor-${ this.props.clientId }` );
	}

	componentDidUpdate( prevProps ) {
		const { clientId, attributes: { content } } = this.props;

		const editor = window.tinymce.get( `editor-${ clientId }` );

		if ( prevProps.attributes.content !== content ) {
			editor.setContent( content || '' );
		}
	}

	initialize() {
		const { clientId } = this.props;
		const { settings } = window.wpEditorL10n.tinymce;
		wp.oldEditor.initialize( `editor-${ clientId }`, {
			tinymce: {
				...settings,
				inline: true,
				content_css: false,
				fixed_toolbar_container: `#toolbar-${ clientId }`,
				setup: this.onSetup,
			},
		} );
	}

	onSetup( editor ) {
		const { attributes: { content }, setAttributes } = this.props;
		const { ref } = this;
		let bookmark;

		this.editor = editor;

		if ( content ) {
			editor.on( 'loadContent', () => editor.setContent( content ) );
		}

		editor.on( 'blur', () => {
			bookmark = editor.selection.getBookmark( 2, true );

			setAttributes( {
				content: editor.getContent(),
			} );

			editor.once( 'focus', () => {
				if ( bookmark ) {
					editor.selection.moveToBookmark( bookmark );
				}
			} );

			return false;
		} );

		editor.on( 'mousedown touchstart', () => {
			bookmark = null;
		} );

		editor.on( 'keydown', ( event ) => {
			if ( ( event.keyCode === BACKSPACE || event.keyCode === DELETE ) && isTmceEmpty( editor ) ) {
				// delete the block
				this.props.onReplace( [] );
				event.preventDefault();
				event.stopImmediatePropagation();
			}

			const { altKey } = event;
			/*
			 * Prevent Mousetrap from kicking in: TinyMCE already uses its own
			 * `alt+f10` shortcut to focus its toolbar.
			 */
			if ( altKey && event.keyCode === F10 ) {
				event.stopPropagation();
			}
		} );


		editor.on( 'init', () => {
			const rootNode = this.editor.getBody();

			// Create the toolbar by refocussing the editor.
			if ( document.activeElement === rootNode ) {
				rootNode.blur();
				this.editor.focus();
			}
		} );
	}

	focus() {
		if ( this.editor ) {
			this.editor.focus();
		}
	}

	onToolbarKeyDown( event ) {
		// Prevent WritingFlow from kicking in and allow arrows navigation on the toolbar.
		event.stopPropagation();
		// Prevent Mousetrap from moving focus to the top toolbar when pressing `alt+f10` on this block toolbar.
		event.nativeEvent.stopImmediatePropagation();
	}

	render() {
		const { clientId } = this.props;

		// Disable reason: the toolbar itself is non-interactive, but must capture
		// events from the KeyboardShortcuts component to stop their propagation.
		/* eslint-disable jsx-a11y/no-static-element-interactions */
		return [
			// Disable reason: Clicking on this visual placeholder should create
			// the toolbar, it can also be created by focussing the field below.
			/* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
			<InspectorControls>
				<MarginOptions
					{ ...this.props }
				/>
				<PaddingOptions
					{ ...this.props }
				/>
				<BorderOptions
					{ ...this.props }
				/>
				<BackgroundColorOptions
					{ ...this.props }
				/>
			</InspectorControls>,
			<div
				key="toolbar"
				id={ `toolbar-${ clientId }` }
				ref={ ( ref ) => this.ref = ref }
				className="block-library-classic__toolbar"
				onClick={ this.focus }
				onKeyDown={ this.onToolbarKeyDown }
			/>,
			<div
				key="editor"
				id={ `editor-${ clientId }` }
				className={ classnames(
					`wp-block-freeform block-library-rich-text__tinymce`,
					...MarginOptionsClasses( this.props ),
					...PaddingOptionsClasses( this.props ),
					...BorderOptionsClasses( this.props ),
				)}
				style={ {
					...BackgroundColorOptionsInlineStyles( this.props ),
				} }
			/>,
		];
		/* eslint-enable jsx-a11y/no-static-element-interactions */
	}
}
