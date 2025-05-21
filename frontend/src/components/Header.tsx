interface HeadinProps{
    label:string
}

export function Header({label}:HeadinProps):JSX.Element{
    return(
         <div className="text-4xl font-bold text-center mt-4 text-gray-900">
        {label}
    </div>
    )
}
