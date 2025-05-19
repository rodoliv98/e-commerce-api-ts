export function parseZodError(err: any) {
    return err.errors.map((err: any) => ({
        field: err.path.join('.'),
        message: err.message
    }));
}