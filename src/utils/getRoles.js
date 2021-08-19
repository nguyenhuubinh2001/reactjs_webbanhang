export default function getRoles(roles) {
    for(var ojectNumbers in roles){
        if(roles[ojectNumbers].name === 'ROLE_ADMIN'){
            return "Admin";
        }
    }
    return "User"
}

