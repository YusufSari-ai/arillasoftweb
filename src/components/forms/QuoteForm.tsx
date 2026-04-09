'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { quoteSchema, type QuoteFormValues } from '@/lib/validations/quote';
import { PROJECT_TYPE_LABELS, BUDGET_RANGE_LABELS, PLATFORM_LABELS } from '@/lib/constants';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

export default function QuoteForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
    defaultValues: { hasExistingSystem: false },
  });

  const onSubmit = async (data: QuoteFormValues) => {
    setStatus('loading');
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
        <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-green-800 mb-2">Teklif Talebiniz Alındı!</h3>
        <p className="text-green-600 mb-2">1-2 iş günü içinde size detaylı teklif sunacağız.</p>
        <p className="text-sm text-green-500 mb-4">E-posta adresinize onay mesajı gönderildi.</p>
        <Button variant="secondary" onClick={() => setStatus('idle')}>
          Yeni Teklif Talebi
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      {status === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
          <AlertCircle className="h-5 w-5 text-red-500 shrink-0" />
          <p className="text-sm text-red-600">Form gönderilemedi. Lütfen tekrar deneyin.</p>
        </div>
      )}

      {/* Kişisel Bilgiler */}
      <div>
        <h3 className="text-base font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-100">
          İletişim Bilgileri
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="fullName">Ad Soyad *</Label>
            <Input id="fullName" placeholder="Ahmet Yılmaz" {...register('fullName')} />
            {errors.fullName && <p className="text-xs text-red-500">{errors.fullName.message}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email">E-posta *</Label>
            <Input id="email" type="email" placeholder="ahmet@sirket.com" {...register('email')} />
            {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="phone">Telefon</Label>
            <Input id="phone" placeholder="+90 500 000 00 00" {...register('phone')} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="company">Şirket</Label>
            <Input id="company" placeholder="Şirket Adı" {...register('company')} />
          </div>
        </div>
      </div>

      {/* Proje Detayları */}
      <div>
        <h3 className="text-base font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-100">
          Proje Detayları
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label>Proje Türü *</Label>
            <Controller
              name="projectType"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seçiniz" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(PROJECT_TYPE_LABELS).map(([value, label]) => (
                      <SelectItem key={value} value={value}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.projectType && <p className="text-xs text-red-500">{errors.projectType.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label>Bütçe Aralığı *</Label>
            <Controller
              name="budgetRange"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seçiniz" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(BUDGET_RANGE_LABELS).map(([value, label]) => (
                      <SelectItem key={value} value={value}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.budgetRange && <p className="text-xs text-red-500">{errors.budgetRange.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label>Hedef Platform *</Label>
            <Controller
              name="targetPlatform"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seçiniz" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(PLATFORM_LABELS).map(([value, label]) => (
                      <SelectItem key={value} value={value}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.targetPlatform && <p className="text-xs text-red-500">{errors.targetPlatform.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="deliveryExpectation">Beklenen Teslim Süresi</Label>
            <Input id="deliveryExpectation" placeholder="Örn: 3 ay, 6 ay..." {...register('deliveryExpectation')} />
          </div>
        </div>
      </div>

      {/* Proje Açıklaması */}
      <div>
        <h3 className="text-base font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-100">
          Proje Açıklaması
        </h3>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="description">Proje Açıklaması *</Label>
            <Textarea
              id="description"
              rows={5}
              placeholder="Projenizi, hedeflerinizi ve temel gereksinimlerinizi açıklayın..."
              {...register('description')}
            />
            {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="integrations">Entegrasyon İhtiyaçları</Label>
            <Input id="integrations" placeholder="Ödeme sistemi, CRM, ERP, API..." {...register('integrations')} />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="hasExistingSystem"
              className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              {...register('hasExistingSystem')}
            />
            <Label htmlFor="hasExistingSystem" className="font-normal cursor-pointer">
              Mevcut bir sistemim var, entegrasyon gerekiyor
            </Label>
          </div>
        </div>
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={status === 'loading'}>
        {status === 'loading' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Gönderiliyor...
          </>
        ) : (
          'Teklif Talebini Gönder'
        )}
      </Button>
    </form>
  );
}
