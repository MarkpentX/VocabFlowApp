// "use client";
//
// import {deleteWordAction} from "@/app/(protected)/tags/actions";
// import {useForm} from "react-hook-form";
//
// interface DeleteFormProps {
//     id: string;
// }
//
// export function DeleteForm({ id }: DeleteFormProps) {
//     const {register, handleSubmit} = useForm<{id: string}>();
//
//     async function onSubmit() {
//         const result = await deleteWordAction(id);
//     }
//
//     return (
//         <form onSubmit={handleSubmit(onSubmit)}>
//             <input type="hidden" value={id} {...register("id")} />
//             <button type="submit">
//                 Delete word
//             </button>
//         </form>
//     );
// }