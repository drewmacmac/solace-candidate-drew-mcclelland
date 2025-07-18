// TODO is there a way to use the ORM to generate this type for us?
// Looks like Drizzle supporrts this, but it would expose the createdAt field which we shouldn't expose (assuming it's an audit field)
// You could use TS Omit though maybe?
export type Advocate = {
    id: string,
    firstName: string,
    lastName: string,
    city: string,
    degree: string,
    // TODO: Database maps this as a jsonb, but defaults to empty array. How to enforce this is always an array?
    // Also, should this be an object for flexibility instead of an array?
    specialties: string[],
    // TODO: use validation library (zod?) to enforce this is an int, not an arbitrary number?
    yearsOfExperience: number[],
    // TODO: This shouldn't be stored as a number.
    //  If we ever support international, they can start with `0` and we'd lose that data (thanks chatgpt)
    phoneNumber: number,
    // TODO: The DB sets this value with a default, but is still nullable. Should we require this in the DB?
    // It's commented out here because it should not be present on the business models
    // (e.g. you should only use it when auditing the DB, not in any functional code)
    // createdAt: Date | null,
};

export type AdvocateApiResult = {
    data: Advocate[];
}
