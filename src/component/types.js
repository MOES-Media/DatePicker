//@flow
export type DatePickerProps = {
    isCalendarVisible: boolean,
    placeholder?: string,
    disabled?: boolean,
}

export type InputProps = {
    value: string,
    placeholder?: string,
    disabled?: boolean,
}

export type InputState = {
    focus: boolean,
    value?: string,
}