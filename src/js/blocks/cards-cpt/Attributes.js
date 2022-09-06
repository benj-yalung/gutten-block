export const Attributes = {
    
    // Data
    articles: {
        type: 'array',
        default:[]
    },

    postTypes: {
        type: 'array',
        default: []
    },
    postType: {
        type: 'string',
        default: ''
    },
    useCPT: {
        type: 'boolean',
        default: true
    },
    header: {
        type: 'string',
        default: 'Header Text'
    },
    headerAlign: {
        type: 'string',
        default: 'center'
    },
    cardActionMargin: {
        type: 'array',
        default: ['10', '10', '10', '10']
    },
    numberOfArticles: {
        type: 'number',
        default: '3'
    },
    defaultArticles: {
        type: 'array',
        default: [
            {
                icon: 'http://custom.test/wp-content/uploads/2022/09/question.png',
                title: 'Card Title',
                tagline: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,',
                card_action_text: 'READ MORE',
                card_action_link: '#',
            },
            {
                icon: 'http://custom.test/wp-content/uploads/2022/09/question.png',
                title: 'Card Title',
                tagline: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,',
                card_action_text: 'READ MORE',
                card_action_link: '#',
            },
            {
                icon: 'http://custom.test/wp-content/uploads/2022/09/question.png',
                title: 'Card Title',
                tagline: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,',
                card_action_text: 'READ MORE',
                card_action_link: '#',
            }
        ]
    },

    // Common
    customBlockId: {
        type: 'string',
        default: ''
    },
    showBackgroundImage: {
        type: 'boolean',
        default: false
    },
    backgroundColor: {
        type: 'string',
        default: '#EBECF0'
    },
    backgroundImageFieldLink: {
        type: 'string',
        default: 'background_image'
    },
    isRedirect: {
        type: 'boolean',
        default: false
    },

    // Icon Styles
    showIcon: {
        type: 'boolean',
        default: true
    },
    iconFieldLink: {
        type: 'string',
        default: 'http://custom.test/wp-content/uploads/2022/09/question.png'
    },
    iconAlign: {
        type: 'string',
        default: 'center'
    },
    
    iconHeight: {
        type: 'string',
        default: '75px'
    },
    iconWidth: {
        type: 'string',
        default: '75px'
    },

    // Tagline Styles
    showTagline: {
        type: 'boolean',
        default: true
    },
    taglineFieldText: {
        type: 'string',
        default: ''
    },
    taglineFontSize: {
        type: 'string',
        default: '16px'
    },
    taglineFontWeight: {
        type: 'string',
        default: '400'
    },
    taglineFontColor: {
        type: 'string',
        default: '#555'
    },
    taglineAlign: {
        type: 'string',
        default: 'center'
    },

    // Title Styles
    titleFields: {
        type: 'string',
        default: [
            {label: 'Title', value: 'title'}
        ]
    },
    titleField: {
        ttype: 'string',
        default: ''
    },

    titleFontSize: {
        type: 'string',
        default: '26px'
    },
    titleFontColor: {
        type: 'string',
        default: '#555'
    },
    titleFontWeight: {
        type: 'string',
        default: '400'
    },
    titleMargin: {
        type: 'array',
        default: ['0', '0', '0', '0']
    },
    titlePadding: {
        type: 'array',
        default: ['0', '0', '0', '0']
    },
    titleAlign: {
        type: 'string',
        default: 'center'
    },

    // CTA Styles
    ctaFieldText: {
        type: 'string',
        default: 'cta_text'
    },
    ctaFieldLink: {
        type: 'string',
        default: 'cta_link'
    },
    ctaAlign: {
        type: 'string',
        default: 'flex-end'
    },
    ctaFontSize: {
        type: 'string',
        default: '18px'
    },
    ctaFontColor: {
        type: 'string',
        default: '#fff'
    },
    ctaFontWeight: {
        type: 'string',
        default: '400'
    },
    ctaBackgroundColor: {
        type: 'string',
        default: '#000'
    },
    ctaBorderWidth: {
        type: 'string',
        default: '1px'
    },
    ctaBorderColor: {
        type: 'string',
        default: '#000'
    },
    ctaPadding: {
        type: 'array',
        default: ['8px', '24px', '8px', '24px']
    },
    ctaMargin: {
        type: 'array',
        default: ['5px', '15px', '5px', '15px']
    },

    // Card Action styles
    showCardAction: {
        type: 'boolean',
        default: true
    },
    cardActionFieldText: {
        type: 'string',
        default: 'card_action_text'
    },
    cardActionFieldLink: {
        type: 'string',
        default: 'card_action_link'
    },
    cardActionFontSize: {
        type: 'string',
        default: '18px'
    },
    cardActionFontWeight: {
        type: 'string',
        default: '400'
    },
    cardActionFontColor: {
        type: 'string',
        default: '#fff'
    },
    cardActionBackgroundColor: {
        type: 'string',
        default: '#1A4E69'
    },
    cardActionPadding: {
        type: 'array',
        default: ['8px', '8px', '8px', '8px']
    },

    // Modal Styles
    descriptionFieldText: {
        type: 'array',
        default: 'description'
    },
    modalMinHeight: {
        type: 'string',
        default: '300px'
    },
    modalMinWidth: {
        type: 'string',
        default: '300px'
    },
    modalBackgroundColor: {
        type: 'string',
        default: '#fff'
    },
    modalIconAlign: {
        type: 'string',
        default: 'center'
    },
    modalTitleAlign: {
        type: 'string',
        default: 'start'
    },
    modalDescriptionAlign: {
        type: 'string',
        default: 'start'
    },

}