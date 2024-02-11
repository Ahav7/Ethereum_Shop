import { ChangeEventHandler } from "react";

export type InputProps = {
    value : string,
    className ?: string;
    onChange : ChangeEventHandler<HTMLInputElement>;
    placeholder?: string;
};

export default function Input(props: InputProps){
    return (
        <input type="text" 
        placeholder={props.placeholder || ''}
        className={"text-right border border-white/10 bg-blue-900 p-2" + props.className}
         
        value={props.value} 
        onChange={props.onChange}/>
    );
}