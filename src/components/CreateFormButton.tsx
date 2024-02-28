'use client'

import React from 'react'
import {
    Dialog, 
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from './ui/dialog'

import { BsFileEarmarkPlus } from 'react-icons/bs'
import { ImSpinner2 } from 'react-icons/im'
import { Button } from './ui/button'
import { 
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from './ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { toast } from './ui/use-toast'
import { formSchema, formShcemaType } from '../../schemas/form'
import { CreateForm } from '../../actions/form'
import { useRouter } from 'next/navigation'

function CreateFormButton() {
    const router = useRouter()
    const form = useForm<formShcemaType>({
        resolver : zodResolver(formSchema)
    })

    async function handleSubmit(values : formShcemaType){
        try {
            const formId = await CreateForm(values)
            toast({
                title: "Success",
                description: "Form created successfully"
            })
            router.push(`/builder/${formId}`)
        } catch (error) {
            toast({
                title: 'Error',
                description: "Something went wrong, please try again",
                variant: 'destructive'
            })
        }
    }
  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button variant="outline" className='group border border-primary/20 h-[190px] items-centerjustify-center flex flex-col hover:border-primary hover:cursor-pointer border-dashed gap-4 bg-background'>
                <BsFileEarmarkPlus className='h-8 w-8 text-muted-foreground group-hover:text-primary' />
                <p className='font-bold text-xl text-muted-foreground group-hover:text-primary'>
                Create New From
                </p>
            </Button>
        </DialogTrigger>
        <DialogContent>

        <DialogHeader>
            <DialogTitle>
                Create form
            </DialogTitle>
            <DialogDescription>
                Create new form to start collecting responses
            </DialogDescription>
        </DialogHeader>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-2'>
                <FormField control={form.control}
                    name="name"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                >
                </FormField>
                <FormField control={form.control}
                    name="description"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea {...field} rows={5} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                >
                </FormField>
            </form>
        </Form>
        <DialogFooter>
            <Button 
                onClick={form.handleSubmit(handleSubmit)}
            disabled={form.formState.isSubmitting} className='w-full mt-4' >
                        {!form.formState.isSubmitting && <span>Save</span>}
                        {form.formState.isSubmitting && <ImSpinner2 className='animate-spin' />}
            </Button>
        </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}

export default CreateFormButton