import { MdAccountCircle } from "react-icons/md"

const SignedInButton = ({setShowProfile}) => {


    return (
        <div onClick={()=>setShowProfile(true)} style={{cursor: 'pointer'}}>
            <MdAccountCircle size={60} style={{color: '#5D13E7'}} />
        </div>
    )
}

export default SignedInButton