import { z } from 'zod';

export const contactSchema = z.object({
  fullName: z.string().min(2, 'Ad soyad en az 2 karakter olmalıdır').max(100),
  email: z.string().email('Geçerli bir e-posta adresi girin'),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.string().min(3, 'Konu en az 3 karakter olmalıdır').max(200),
  message: z.string().min(10, 'Mesaj en az 10 karakter olmalıdır').max(5000),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
