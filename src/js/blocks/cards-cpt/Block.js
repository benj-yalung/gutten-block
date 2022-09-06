import apiFetch from '@wordpress/api-fetch';
import { Component } from "@wordpress/element";

export class CardBlock extends Component
{
    constructor(props) {
        super(props)
        this.state = {
            articles: []
        }
    }

    componentDidMount() {
        const { setAttributes } = this.props

        apiFetch({
            path: '/wp-json/cklph/v1/post-types'
        })
        .then( res => {
            console.log(res)
            setAttributes({ postTypes: res })
        } )

        apiFetch({
            path: '/wp-json/cklph/v1/articles'
        })
        .then(res => {
            setAttributes({ articles: res })
        })
    }

    render() {
        const { attributes } = this.props
        return (
            <div id={ attributes.customBlockId } className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
                style= {{
                    backgroundColor: attributes.backgroundColor
                }}>
                <div className='w-full' style={{ 
                    textAlign: attributes.headerAlign,
                    backgroundColor: attributes.backgroundColor,
                    padding: '30px'

                }}>
                    <h1>{ attributes.useCPT ? ""  : attributes.header  }</h1>
                </div>
                <div style = {{
                    display: 'flex',
                    flexWrap: 'wrap'
                }}>
                {
                    attributes.articles.map((article, index) => (
                        <>
                            <div className='flex flex-col pt-3 bg-white max-w-sm px-4 pt-3' style={
                                { 
                                    backgroundColor: attributes.backgroundColor,
                                    minHeight: '350px',
                                    width: '33%'
                                }
                            }>
                                {
                                    attributes.showIcon &&
                                    <div className='icon-container w-full flex py-5' style={{ 
                                        justifyContent: attributes.iconAlign
                                    }}>
                                        <img src={ attributes.useCPT ? article[attributes.iconFieldLink] : article.icon } style={{ 
                                            height: attributes.iconHeight,
                                            width: attributes.iconWidth
                                        }} />
                                    </div>
                                }
                                <div className='title-container w-full px-3 pt-5' style={
                                    attributes.showCardAction ?
                                    {
                                        margin: `${attributes.titleMargin[0]} ${attributes.titleMargin[1]} ${attributes.titleMargin[2]} ${attributes.titleMargin[3]}`,           
                                        textAlign: attributes.titleAlign
                                        
                                    }
                                    :
                                    {
                                        marginBottom: 'auto',
                                        padding: `${attributes.titleMargin[0]} ${attributes.titleMargin[1]} ${attributes.titleMargin[2]} ${attributes.titleMargin[3]}`,
                                        textAlign: attributes.titleAlign,
                                        padding: '15px'

                                    }
                                }> 
                                    <h2 className='text-lg' style={{
                                        fontSize: attributes.titleFontSize,
                                        fontWeight: attributes.titleFontWeight,
                                        color: attributes.titleFontColor
                                        
                                    }}>{ attributes.useCPT ? article[attributes.titleField] : article.title }</h2>
                                </div>
                                {
                                    attributes.showTagline &&
                                    <div className='w-full' style={{ 
                                        textAlign: attributes.taglineAlign
                                    }}>
                                        <p style={{ 
                                            fontSize: attributes.taglineFontSize,
                                            fontWeight: attributes.taglienFontWeight,
                                            color: attributes.taglineFontColor,

                                        }}>{ attributes.useCPT ? article[attributes.taglineFieldText] : article.tagline }</p>
                                    </div>
                                }
                                
                                {
                                    attributes.showCardAction &&
                                    <div className='w-full' style={{ 
                                        textAlign: attributes.taglineAlign,
                                        
                                    }}>
                                        <a href={ attributes.useCPT ? article[attributes.cardActionFieldText] : article.card_action_link } className='w-full card-action-link'>
                                            <div className='w-full' style={{
                                               
                                                fontSize: attributes.cardActionFontSize,
                                                fontWeight: attributes.cardActionFontWeight,
                                                color: attributes.cardActionFontColor,
                                                backgroundColor: attributes.cardActionBackgroundColor,
                                                // margin: `${attributes.cardActionMargin[0]} ${attributes.cardActionMargin[1]} ${attributes.cardActionMargin[2]} ${attributes.cardActionMargin[3]}`,           
                                                padding: `${attributes.cardActionPadding[0]} ${attributes.cardActionPadding[1]} ${attributes.cardActionPadding[2]} ${attributes.cardActionPadding[3]}`
                                            }}>{ attributes.useCPT ? article[attributes.cardActionFieldText] : article.card_action_text }</div>
                                        </a>
                                    </div>
                                }
                            </div>

                            {/* Modal */}
                            {
                                attributes.isRedirect == false &&
                                <div className="modal px-5 py-7 drop-shadow-lg border border-gray-300" data-id={ `modal-${index + 1}` } style={{ 
                                    display: 'none',
                                    position: 'absolute',
                                    minHeight: attributes.modalMinHeight,
                                    minWidth: attributes.modalMinWidth,
                                    borderRadius: attributes.modalBorderRadius,
                                    border: `${attributes.modalBorderWidth} solid ${attributes.modalBorderColor}`,
                                    zIndex: '10',
                                    backgroundColor: attributes.modalBackgroundColor,
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)'
                                }}>    
                                    <div className="content-wrapper flex h-full">
                                        <div className="modal-icon-container flex" style={{ 
                                            justifyContent: attributes.modalIconAlign
                                        }}>
                                            <img src={ attributes.useCPT ? article[attributes.iconFieldLink] : article.icon } style={{ 
                                                height: attributes.iconHeight,
                                                width: attributes.iconWidth
                                            }} />
                                        </div>
    
                                        <div className="modal-title-container" style={{ 
                                            textAlign: attributes.modalTitleAlign
                                        }}>
                                            <h2 className="modal-title">{ attributes.useCPT ? article[attributes.titleField] : article.title }</h2>
                                        </div>
                                        <div className="modal-contents-container mb-auto" style={{ 
                                            textAlign: attributes.modalDescriptionAlign
                                        }}>
                                            <small className="modal-contents">{ attributes.useCPT ? article[attributes.taglineFieldText] : article.tagline }</small>
                                        </div>
                                        <div className="modal-actions-container text-center">
                                            <a href="javascript:void(0)" className="modal-close-button text-red-500">Close</a>
                                        </div>  
                                    </div>
                                </div>
                            }
                        </>
                    ))
                }
                </div>
            </div>
        )
    }
}

