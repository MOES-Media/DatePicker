//@flow
export type DatePickerProps = {
    placeholder?: string,
    disabled?: boolean,
}

export type DatePickerState = {
    isCalendarVisible: boolean,
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

export type CalendarProps = {
    visible: boolean,
}