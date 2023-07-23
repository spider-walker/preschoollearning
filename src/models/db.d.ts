export type DbUser = {
    parent_id: number;
    username: string;
    password: string;
    name: string;
    is_admin: number;
}
export type Games = {
    game_id: number;
    category: number;
    name: string;
}
export type Children = {
    name: string;
    dob: string;
    parent_id: number;
    child_id: number;
    no_of_children: number;
    immunization?: Array<Immunization>;
}

export type Immunization = {
    immunization_id: number;
    name: string;
    scheduled_date: string;
    administered_date: string;
    height: number;
    weight: number;
    child_id: number;
    done_by: number
}