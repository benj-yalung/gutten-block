const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

import { Attributes } from './Attributes'
import { Controller } from './Controller'
import { CardBlock } from './Block'

registerBlockType( 'gb/articles-cpt', {
    title: __( 'Cards', 'GB' ),
    icon: 'shield',
    category: 'common',

    attributes: Attributes,

    edit: function({ attributes, setAttributes }) {
        return ([
            <Controller attributes={ attributes } setAttributes={ setAttributes } />,
            <CardBlock attributes={ attributes } setAttributes={ setAttributes } />
        ])
    },

    save: function({ attributes, setAttributes }) {
        return <CardBlock attributes={ attributes } setAttributes={ setAttributes } />
    }

} )