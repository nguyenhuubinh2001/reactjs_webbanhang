export default function getListRole(role) {
    const ADMIN = {
        id: 1,
        name: "ROLE_ADMIN"
    }
    const USER = {
        id: 2,
        name: "ROLE_USER"
    }
    const GUEST = {
        id: 3,
        name: "ROLE_GUEST"
    }
    if(role==="Admin"){
        return [
            ADMIN,
            USER,
            GUEST
        ]
    }else {
        return [
            USER,
            GUEST
        ]
    }
}