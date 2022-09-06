import apiFetch from '@wordpress/api-fetch';

const {
    PanelBody,
    FontSizePicker,
    TextControl,
    TextareaControl,
    RangeControl,
    ButtonGroup,
    Button,
    SelectControl,
    ToggleControl,
    IconButton
} = wp.components;
const { InspectorControls, ColorPalette, MediaUpload } = wp.editor;

export const Controller = function({ attributes, setAttributes }) {

    /**
     * Custom Update Attributes function
     * 
     * @param {string} key 
     * @param {string} value 
     * @param {integer} position 
     * @param {integer} index 
     * @param {string} arrayKey 
     * @param {boolean} isImage 
     */
    function updateAttributes(key = null, value = null, position = null, index = null, arrayKey = null, isImage = false) {

        if( position == null ) {
            setAttributes( { [key]: ! isImage ? value : value.sizes.full.url } )
        }

        if( position !== null ) {
            let newValue = [...attributes[key]]
            newValue[position] = ! isImage ? value : value.sizes.full.url
            setAttributes( { [key]: newValue } )
        }

        if( position == null && index !== null && arrayKey !== null) {
            let newValue = [...attributes[arrayKey]]
            let newObj = newValue[index]
            newObj[key] = ! isImage ? value : value.sizes.full.url
            setAttributes( { [arrayKey]: newValue } )
        }

        if( position !== null && index !== null && arrayKey !== null ) {
            let newValue = [...attributes[arrayKey]]
            let newObj = newValue[index]
            let newItem = newObj[key]
            newItem[position] = ! isImage ? value : value.sizes.full.url
            setAttributes({ [arrayKey]: newValue })
        }
    }

    /**
     * Function for fetching the post types and post data for the block
     * 
     * @param {string} value 
     */
    function setPostType(value) {
        // Change data by post type
        apiFetch({
            path: '/wp-json/cklph/v1/get-post-data/?type=' + value
        })
        .then(res => {
            setAttributes({ postType: value, articles: res })
        })

        apiFetch({
            path: '/wp-json/cklph/v1/custom-fields/?type=' + value
        })
        .then(res => {
            setAttributes({ titleFields: res })
        })
        setAttributes({ postType: value })
    }

    /**
     * For toggling the data to be used, from CPT or static data
     * 
     * @param {string} value 
     */
    function setUseCPT(value) {
        if( ! value ) {
            let defaultCards = [...attributes.defaultArticles]
            setAttributes({ useCPT: value, articles: defaultCards })
        }
        else {
            apiFetch({
                path: '/wp-json/cklph/v1/get-post-data/?type=' + attributes.postType
            })
            .then( res => setAttributes({ useCPT: value, articles: res }) )
        }
    }

    /**
     * Function to change the number of cards
     * 
     * @param {string} value 
     */
    function setNumberOfArticles(value) {
        let newData = []
        for(let i = 0; i < value; i++) {
            if( (i + 1) > attributes.numberOfArticles ) {
                newData.push({
                    icon: 'http://custom.test/wp-content/uploads/2022/09/question.png',
                    title: 'Card Title',
                    tagline: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,',
                    //cta_text: 'Read More',
                    //cta_link: '#',
                    card_action_text: 'READ MORE',
                    card_action_link: '#',
                    //background_image: ''
                })
            }
            else {
                newData.push(attributes.articles[i])
            }
        }
        setAttributes({ articles: newData, numberOfArticles: value })
    }

    return (
        <InspectorControls>
            <p><strong>Custom Block ID</strong></p>
            <TextControl value={ attributes.customBlockId } onChange={ value => updateAttributes('customBlockId', value) }></TextControl>
            <ToggleControl
                label={ 'Use Post Type' }
                checked={ attributes.useCPT }
                onChange={ setUseCPT } />
            {
                attributes.useCPT &&
                <SelectControl
                    label={ 'Post Type' }
                    value={ attributes.postType }
                    options={ attributes.postTypes }
                    onChange={ setPostType } />
            }
            {
                attributes.useCPT == false &&
                <RangeControl
                    label={ 'Number of Cards' }
                    value={ attributes.numberOfArticles }
                    initialPosition={ attributes.numberOfArticles }
                    onChange={ setNumberOfArticles }
                    min={ 1 }
                    max={ 20 }
                    step={ 1 } />
            }
            <ToggleControl
                label={ 'Is Redirect ?' }
                checked={ attributes.isRedirect }
                onChange={ value => updateAttributes('isRedirect', value) } />
            

                {/* Static Content Settings */}
                {
                attributes.useCPT == false &&
                <PanelBody initialOpen={ false } title={ 'Header Contents' }>
                    <p><strong>Header</strong></p>
                    <TextControl value={ attributes.header } onChange={ value => updateAttributes('header', value) }></TextControl> 
                    
                </PanelBody>
                
            }

            {/* Static Content Settings */}
            {
                attributes.useCPT == false &&
                <PanelBody initialOpen={ false } title={ 'Static Contents' }>
                    {
                        attributes.articles.map((article, index) => (
                            <PanelBody initialOpen={ false } title={ `Card #${index + 1}` }>
                                <p><strong>Icon</strong></p>
                                <MediaUpload
                                    type="image"
                                    onSelect={ value => updateAttributes('icon', value, null, index, 'articles', true) }
                                    value={ article.icon }
                                    render={ ({open}) => (
                                        <IconButton
                                            onClick={ open }
                                            icon="upload"
                                            className="editor-media-placeholder__button is-button is-default is-large">
                                                Icon Image
                                        </IconButton>
                                    ) } />
                                <p><strong>Title</strong></p>
                                <TextControl value={ article.title } onChange={ value => updateAttributes('title', value, null, index, 'articles') }></TextControl>
                                <p><strong>Description</strong></p>
                                <TextControl value={ article.tagline } onChange={ value => updateAttributes('tagline', value, null, index, 'articles') }></TextControl>
                                <p><strong>Button Text</strong></p> 
                                <TextControl value={ article.card_action_text } onChange={ value => updateAttributes('card_action_text', value, null, index, 'articles') }></TextControl>
                                <p><strong>Button Link</strong></p>
                                <TextControl value={ article.card_action_link } onChange={ value => updateAttributes('card_action_link', value, null, index, 'articles') }></TextControl>
                            </PanelBody>
                        ))
                    }
                </PanelBody>
            }

            {/* Icon Styles */}
            <PanelBody initialOpen={ false } title={ 'Icon Styles' }>
                <ToggleControl
                    label={ 'Show Icon ?' }
                    checked={ attributes.showIcon }
                    onChange={ value => updateAttributes('showIcon', value) } />
                <SelectControl
                    label={ 'Icon Link' }
                    value={ attributes.iconFieldLink }
                    onChange={ value => updateAttributes('iconFieldLink', value) }
                    options={ attributes.titleFields } />
                <p><strong>Height</strong></p>
                <FontSizePicker value={ attributes.iconHeight } onChange={ value => updateAttributes('iconHeight', value) }></FontSizePicker>
                <p><strong>Width</strong></p>
                <FontSizePicker value={ attributes.iconWidth } onChange={ value => updateAttributes('iconWidth', value) }></FontSizePicker>
            </PanelBody>

            {/* Tagline Styles */}
            <PanelBody initialOpen={ false } title={ 'Description Styles' }>
                <ToggleControl
                    label={ 'Show Description?' }
                    checked={ attributes.showTagline }
                    onChange={ value => updateAttributes('showTagline', value) } />
                <SelectControl
                    label={ 'Description Text' }
                    value={ attributes.taglineFieldText }
                    options={ attributes.titleFields }
                    onChange={ value => updateAttributes('taglineFieldText', value) } />
                <p><strong>Font Size</strong></p>
                <FontSizePicker value={ attributes.taglineFontSize } onChange={ value => updateAttributes('taglineFontSize', value) }></FontSizePicker>
                {/* <RangeControl
                    label={ 'Font Weight' }
                    value={ attributes.taglineFontWeight }
                    min={ 100 }
                    max={ 1000 }
                    step={ 100 }
                    initialPosition={ attributes.taglineFontWeight }
                    onChange={ value => updateAttributes('taglineFontWeight', value) } /> */}
                <p><strong>Font Color</strong></p>
                <ColorPalette value={ attributes.taglineFontColor } onChange={ value => updateAttributes('taglineFontColor', value) }></ColorPalette>
                <p><strong>Tagline Align</strong></p>
                <ButtonGroup>
                    <Button variant={ attributes.taglineAlign == 'start' ? 'primary' : 'secondary' } onClick={ () => updateAttributes('taglineAlign', 'start') }>Left</Button>
                    <Button variant={ attributes.taglineAlign == 'center' ? 'primary' : 'secondary' } onClick={ () => updateAttributes('taglineAlign', 'center') }>Center</Button>
                    <Button variant={ attributes.taglineAlign == 'end' ? 'primary' : 'secondary' } onClick={ () => updateAttributes('taglineAlign', 'end') }>Right</Button>
                </ButtonGroup>
            </PanelBody>

            {/* Title Styles */}
            <PanelBody initialOpen={ false } title={ 'Title Styles' }>
                <SelectControl
                    label={ 'Field' }
                    value={ attributes.titleField }
                    onChange={ value => updateAttributes('titleField', value) }
                    options={ attributes.titleFields } />
                <PanelBody initialOpen={ false } title={ 'Padding' }>
                    <p><strong>Top</strong></p>
                    <FontSizePicker value={ attributes.titlePadding[0] } onChange={ value => updateAttributes('titlePadding', value, 0) }></FontSizePicker>
                    <p><strong>Right</strong></p>
                    <FontSizePicker value={ attributes.titlePadding[1] } onChange={ value => updateAttributes('titlePadding', value, 1) }></FontSizePicker>
                    <p><strong>Bottom</strong></p>
                    <FontSizePicker value={ attributes.titlePadding[2] } onChange={ value => updateAttributes('titlePadding', value, 2) }></FontSizePicker>
                    <p><strong>Left</strong></p>
                    <FontSizePicker value={ attributes.titlePadding[3] } onChange={ value => updateAttributes('titlePadding', value, 3) }></FontSizePicker>
                </PanelBody>
                <PanelBody initialOpen={ false } title={ 'Margin' }>
                    <p><strong>Top</strong></p>
                    <FontSizePicker value={ attributes.titleMargin[0] } onChange={ value => updateAttributes('titleMargin', value, 3) }></FontSizePicker>
                    <p><strong>Right</strong></p>
                    <FontSizePicker value={ attributes.titleMargin[1] } onChange={ value => updateAttributes('titleMargin', value, 3) }></FontSizePicker>
                    <p><strong>Bottom</strong></p>
                    <FontSizePicker value={ attributes.titleMargin[2] } onChange={ value => updateAttributes('titleMargin', value, 3) }></FontSizePicker>
                    <p><strong>Left</strong></p>
                    <FontSizePicker value={ attributes.titleMargin[3] } onChange={ value => updateAttributes('titleMargin', value, 3) }></FontSizePicker>
                </PanelBody>
                <p><strong>Font Size</strong></p>
                <FontSizePicker value={ attributes.titleFontSize } onChange={ value => updateAttributes('titleFontSize', value, 3) }></FontSizePicker>
                <RangeControl 
                    label={ 'Font Weight' }
                    value={ attributes.titleFontWeight }
                    onChange={ value => updateAttributes('titleFontWeight', value) }
                    initialPosition={ attributes.titleFontWeight }
                    min={ 100 }
                    max={ 1000 }
                    step={ 100 } />
                <p><strong>Font Color</strong></p>
                <ColorPalette value={ attributes.titleFontColor } onChange={ value => updateAttributes('titleFontColor', value)  }></ColorPalette>
            </PanelBody>

            {/* CTA Styles
            <PanelBody initialOpen={ false } title={ 'CTA Styles' }>
                <SelectControl
                    label={ 'CTA Text' }
                    value={ attributes.ctaFieldText }
                    options={ attributes.titleFields }
                    onChange={ value => updateAttributes('ctaFieldText', value) } />
                <SelectControl
                    label={ 'CTA Link' }
                    value={ attributes.ctaFieldLink }
                    options={ attributes.titleFields }
                    onChange={ value => updateAttributes('ctaFieldLink', value) } />
                <ButtonGroup>
                    <Button variant={ attributes.ctaAlign == 'flex-start' ? 'primary' : 'secondary' } onClick={ () => updateAttributes('ctaAlign', 'flex-start') }>Left</Button>
                    <Button variant={ attributes.ctaAlign == 'center' ? 'primary' : 'secondary' } onClick={ () => updateAttributes('ctaAlign', 'center') }>Center</Button>
                    <Button variant={ attributes.ctaAlign == 'flex-end' ? 'primary' : 'secondary' } onClick={ () => updateAttributes('ctaAlign', 'flex-end') }>Right</Button>
                </ButtonGroup>
                <PanelBody initialOpen={ false } title={ 'Padding' }>
                    <p><strong>Top</strong></p>
                    <FontSizePicker value={ attributes.ctaPadding[0] } onChange={ value => updateAttributes('ctaPadding', value, 0) }></FontSizePicker>
                    <p><strong>Right</strong></p>
                    <FontSizePicker value={ attributes.ctaPadding[1] } onChange={ value => updateAttributes('ctaPadding', value, 1) }></FontSizePicker>
                    <p><strong>Bottom</strong></p>
                    <FontSizePicker value={ attributes.ctaPadding[2] } onChange={ value => updateAttributes('ctaPadding', value, 2) }></FontSizePicker>
                    <p><strong>Left</strong></p>
                    <FontSizePicker value={ attributes.ctaPadding[3] } onChange={ value => updateAttributes('ctaPadding', value, 3) }></FontSizePicker>
                </PanelBody>
                <PanelBody initialOpen={ false } title={ 'Margin' }>
                    <p><strong>Top</strong></p>
                    <FontSizePicker value={ attributes.ctaMargin[0] } onChange={ value => updateAttributes('ctaMargin', value, 0) }></FontSizePicker>
                    <p><strong>Right</strong></p>
                    <FontSizePicker value={ attributes.ctaMargin[1] } onChange={ value => updateAttributes('ctaMargin', value, 1) }></FontSizePicker>
                    <p><strong>Bottom</strong></p>
                    <FontSizePicker value={ attributes.ctaMargin[2] } onChange={ value => updateAttributes('ctaMargin', value, 2) }></FontSizePicker>
                    <p><strong>Left</strong></p>
                    <FontSizePicker value={ attributes.ctaMargin[3] } onChange={ value => updateAttributes('ctaMargin', value, 3) }></FontSizePicker>
                </PanelBody>
                <p><strong>Font Size</strong></p>
                <FontSizePicker value={ attributes.ctaFontSize } onChange={ value => updateAttributes('ctaFontSize', value) }></FontSizePicker>
                <RangeControl
                    label={ 'Font Weight' }
                    value={ attributes.ctaFontWeight }
                    onChange={ value => updateAttributes('ctaFontWeight', value) }
                    initialPosition={ attributes.ctaFontWeight }
                    min={ 100 }
                    max={ 1000 }
                    step={ 100 } />
                <p><strong>Font Color</strong></p>
                <ColorPalette value={ attributes.ctaFontColor } onChange={ value => updateAttributes('ctaFontColor', value) }></ColorPalette>
                <p><strong>Background Color</strong></p>
                <ColorPalette value={ attributes.ctaBackgroundColor } onChange={ value => updateAttributes('ctaBackgroundColor', value) }></ColorPalette>
                <p><strong>Border Width</strong></p>
                <FontSizePicker value={ attributes.ctaBorderWidth } onChange={ value => updateAttributes('ctaBorderWidth', value) }></FontSizePicker>
                <p><strong>Border Color</strong></p>
                <ColorPalette value={ attributes.ctaBorderColor } onChange={ value => updateAttributes('ctaBorderColor', value) }></ColorPalette>
            </PanelBody> */}

            {/* Card Action Styles */}
            <PanelBody initialOpen={ false } title={ 'Button Styles' }>
                <ToggleControl
                    label={ 'Show Button?' }
                    checked={ attributes.showCardAction }
                    onChange={ value => updateAttributes('showCardAction', value) } />
                <SelectControl
                    label={ 'Button Text' }
                    value={ attributes.cardActionFieldText }
                    options={ attributes.titleFields }
                    onChange={ value => updateAttributes('cardActionFieldText', value) } />
                <SelectControl
                    label={ 'Button Link' }
                    value={ attributes.cardActionFieldLink }
                    options={ attributes.titleFields }
                    onChange={ value => updateAttributes('cardActionFieldLink', value) } />
                <PanelBody initialOpen={ false } title={ 'Padding' }>
                    <p><strong>Top</strong></p>
                    <FontSizePicker value={ attributes.cardActionPadding[0] } onChange={ value => updateAttributes('cardActionPadding', value, 0) }></FontSizePicker>
                    <p><strong>Right</strong></p>
                    <FontSizePicker value={ attributes.cardActionPadding[1] } onChange={ value => updateAttributes('cardActionPadding', value, 1) }></FontSizePicker>
                    <p><strong>Bottom</strong></p>
                    <FontSizePicker value={ attributes.cardActionPadding[2] } onChange={ value => updateAttributes('cardActionPadding', value, 2) }></FontSizePicker>
                    <p><strong>Left</strong></p>
                    <FontSizePicker value={ attributes.cardActionPadding[3] } onChange={ value => updateAttributes('cardActionPadding', value, 3) }></FontSizePicker>
                </PanelBody>
                {/* <PanelBody initialOpen={ false } title={ 'Margin' }>
                        <p><strong>Top</strong></p>
                        <FontSizePicker value={ attributes.cardActionMargin[0] } onChange={ value => updateAttributes('cardActionMargin', value, 3) }></FontSizePicker>
                        <p><strong>Right</strong></p>
                        <FontSizePicker value={ attributes.cardActionMargin[1] } onChange={ value => updateAttributes('cardActionMargin', value, 3) }></FontSizePicker>
                        <p><strong>Bottom</strong></p>
                        <FontSizePicker value={ attributes.cardActionMargin[2] } onChange={ value => updateAttributes('cardActionMargin', value, 3) }></FontSizePicker>
                        <p><strong>Left</strong></p>
                        <FontSizePicker value={ attributes.cardActionMargin[3] } onChange={ value => updateAttributes('cardActionMargin', value, 3) }></FontSizePicker>
                </PanelBody>    */}
                <p><strong>Font Size</strong></p>
                <FontSizePicker value={ attributes.cardActionFontSize } onChange={ value => updateAttributes('cardActionFontSize', value) }></FontSizePicker>
                <RangeControl
                    label={ 'Font Weight' }
                    value={ attributes.cardActionFontWeight }
                    initialPosition={ attributes.cardActionFontWeight }
                    onChange={ value => updateAttributes('cardActionFontWeight', value) }
                    min={ 100 }
                    max={ 1000 }
                    step={ 100 } />
                <p><strong>Font Color</strong></p>
                <ColorPalette value={ attributes.cardActionFontColor } onCahnge={ value => updateAttributes('cardActionFontColor', value) }></ColorPalette>
                <p><strong>Background Color</strong></p>
                <ColorPalette value={ attributes.cardActionBackgroundColor } onChange={ value => updateAttributes('cardActionBackgroundColor', value) }></ColorPalette>
            </PanelBody>

            {/* Modal Styles
            <PanelBody initialOpen={ false } title={ 'Modal Styles' }>
                <SelectControl
                    label={ 'Description Field' }
                    value={ attributes.descriptionFieldText }
                    options={ attributes.titleFields }
                    onChange={ value => updateAttributes('descriptionFieldText', value) } />
                <p><strong>Modal Min Height</strong></p>
                <FontSizePicker value={ attributes.modalMinHeight } onChange={ value => updateAttributes('modalMinHeight', value) }></FontSizePicker>
                <p><strong>Modal Min Width</strong></p>
                <FontSizePicker value={ attributes.modalMinWidth } onChange={ value => updateAttributes('modalMinWidth', value) }></FontSizePicker>
                <p><strong>Modal Background Color</strong></p>
                <ColorPalette value={ attributes.modalBackgroundColor } onChange={ value => updateAttributes('modalBackgroundColor', value) }></ColorPalette>
                <p><strong>Modal Icon Align</strong></p>
                <ButtonGroup>
                    <Button variant={ attributes.modalIconAlign == 'flex-start' ? 'primary' : 'secondary' } onClick={ () => updateAttributes('modalIconAlign', 'flex-start') }>Left</Button>
                    <Button variant={ attributes.modalIconAlign == 'center' ? 'primary' : 'secondary' } onClick={ () => updateAttributes('modalIconAlign', 'center') } >Center</Button>
                    <Button variant={ attributes.modalIconAlign == 'flex-end' ? 'primary' : 'secondary' } onClick={ () => updateAttributes('modalIconAlign', 'flex-end') } >Right</Button>
                </ButtonGroup>
                <p><strong>Modal Title Align</strong></p>
                <ButtonGroup>
                    <Button variant={ attributes.modalTitleAlign == 'start' ? 'primary' : 'secondary' } onClick={ () => updateAttributes('modalTitleAlign', 'start') }>Left</Button>
                    <Button variant={ attributes.modalTitleAlign == 'center' ? 'primary' : 'secondary' } onClick={ () => updateAttributes('modalTitleAlign', 'center') }>Center</Button>
                    <Button variant={ attributes.modalTitleAlign == 'end' ? 'primary' : 'secondary' } onClick={ () => updateAttributes('modalTitleAlign', 'end') }>Right</Button>
                </ButtonGroup>
                <p><strong>Modal Description Align</strong></p>
                <ButtonGroup>
                    <Button variant={ attributes.modalDescriptionAlign == 'start' ? 'primary' : 'secondary' } onClick={ () => updateAttributes('modalDescriptionAlign', 'start') }>Left</Button>
                    <Button variant={ attributes.modalDescriptionAlign == 'center' ? 'primary' : 'secondary' } onClick={ () => updateAttributes('modalDescriptionAlign', 'center') }>Center</Button>
                    <Button variant={ attributes.modalDescriptionAlign == 'end' ? 'primary' : 'secondary' } onClick={ () => updateAttributes('modalDescriptionAlign', 'end') }>Right</Button>
                </ButtonGroup>
            </PanelBody> */}
        </InspectorControls>
    )
}