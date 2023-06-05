import '../styles/customer-card.css';
import '../styles/fonts.css';
import escape from '../images/icons/escape-purple.svg'

const CustomerCard = ({setShowCustomerCard, customerInfo}) => {
    return (
        <div className="customerCard_background">
            <div className="customerCard_container">
                <div className="customerCard_header-section">
                    <h1 className="customerCard_header customerCard_h1">
                        Представитель компании
                    </h1>
                    <div className="customerCard_escape-img" onClick={()=>setShowCustomerCard(false)}>
                        <img src={escape} alt="" className='customerCard_img' />
                    </div>
                </div>
                <div className="customerCard_content-section">
                    <div className="customerCard_profile-image">
                        <img src={`http://localhost:5000/${customerInfo.profileImageLink.replace('uploads\\', '')}`} alt="" className='customerCard_img' />
                    </div>
                    <div className="customerCard_text-container">
                        <p className="customerCard_name">{customerInfo.name}</p>
                        <p>Email: {customerInfo.email}</p>
                        <p>Telegram: {customerInfo.telegram}</p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default CustomerCard;