'use client';

import Image from "next/image";
import clsx from "clsx";
import { SubmitHandler, useForm } from "react-hook-form";
import type { Task, TaskStatus } from "@/interfaces/task.interface";

export const TaskAsideForm = () => {
  const { register, handleSubmit } = useForm<Task>();
  const onSubmit: SubmitHandler<Task> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label content="Task name" />
        <input
          type="text"
          className="w-full px-4 py-2 rounded-lg outline-none border-2 border-[#E3E8EF] focus:border-[#3662E3]"
          {...register('name')}
        />
      </div>
      <div>
        <Label content="Description" />
        <textarea
          placeholder="Enter a short description"
          className="w-full h-44 px-4 py-2 rounded-lg outline-none border-2 border-[#E3E8EF] focus:border-[#3662E3] resize-none"
          {...register('description')}
        >
        </textarea>
      </div>
      <div>
        <Label content="Icon" />
        <div className="flex gap-x-3">
          <IconRadioButton content="👨🏻‍💻" {...register('icon')} value={'man-working'} defaultChecked />
          <IconRadioButton content="🗨️" {...register('icon')} value={'dialog'} />
          <IconRadioButton content="☕" {...register('icon')} value={'coffee'} />
          <IconRadioButton content="🏋🏻‍♂️" {...register('icon')} value={'weightlifter'} />
          <IconRadioButton content="📚" {...register('icon')} value={'books'} />
          <IconRadioButton content="⏰" {...register('icon')} value={'clock'} />
        </div>
      </div>
      <div>
        <Label content="Status" />
        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          <StatusRadioButton content="In Progress" status={'in-progress'} {...register('status')} value={'in-progress'} />
          <StatusRadioButton content="Completed" status={'completed'} {...register('status')} value={'completed'} />
          <StatusRadioButton content="Won't do" status={'wont-do'} {...register('status')} value={'wont-do'} />
        </div>
      </div>
      <div className="h-36 flex justify-end items-end gap-x-4">
        <button type="button" className="px-6 py-2 flex items-center gap-x-2 rounded-3xl text-sm text-white bg-[#97A3B6]">
          Delete
          <Image
            src={'/Trash.svg'}
            alt="trash-icon"
            width={20}
            height={20}
          />
        </button>
        <button type="submit" className="px-6 py-2 flex items-center gap-x-2 rounded-3xl text-sm text-white bg-[#3662E3]">
          Save
          <Image
            src={'/Done_round.svg'}
            alt="done-icon"
            width={20}
            height={20}
          />
        </button>
      </div>
    </form>
  );
};

interface LabelProps {
  content: string;
}

const Label = ({ content }: LabelProps) => {
  return (
    <label className="w-full text-xs font-medium text-[#97A3B6]">
      {content}
    </label>
  );
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  content: string;
}

const IconRadioButton = ({ content, ...props }: InputProps) => {
  return (
    <label className="relative block w-11 h-11 rounded-xl cursor-pointer overflow-hidden [&:hover_>_input_+_span]:bg-slate-300 [&_>_input:checked_+_span]:bg-[#F5D565]">
      <input type="radio" name="radio-icon" className="absolute w-0 h-0 opacity-0" {...props} />
      <span className="w-full h-full flex justify-center items-center text-2xl select-none bg-[#E3E8EF]">{content}</span>
    </label>
  );
};

type StatusRadioButtonProps = InputProps & { status: TaskStatus };

const StatusRadioButton = ({ content, status, ...props }: StatusRadioButtonProps) => {
  return (
    <label className="relative block rounded-2xl cursor-pointer">
      <input type="radio" name="radio-status" {...props} className="peer absolute w-0 h-0 opacity-0" />
      <div className="flex items-center rounded-2xl p-[2px] pr-3 border-2 border-[#E3E8EF] peer-checked:border-[#3662E3] peer-checked:[&_>_div:last-child]:bg-[#3662E3]">
        <div className={clsx(
          "w-11 h-11 rounded-xl bg-center bg-no-repeat",
          status === 'in-progress' && "bg-[#E9A23B] bg-[url('/Time_atack_duotone.svg')]",
          status === 'completed' && "bg-[#32D657] bg-[url('/Done_round_duotone.svg')]",
          status === 'wont-do' && "bg-[#DD524C] bg-[url('/close_ring_duotone.svg')]"
        )}></div>
        <span className="flex-1 ml-3 font-medium">{content}</span>
        <div className="w-5 h-5 rounded-full bg-[url('/Done_round.svg')] bg-center bg-[length:13px] bg-no-repeat"></div>
      </div>
    </label>
  );
};