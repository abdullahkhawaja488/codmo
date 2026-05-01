'use client';

import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse bg-gradient-to-r from-cyan-500/5 via-cyan-500/10 to-cyan-500/5 bg-[length:200%_100%]',
        className
      )}
      style={{
        animation: 'shimmer 1.5s ease-in-out infinite',
      }}
    />
  );
}

export function WeaponCardSkeleton() {
  return (
    <div className="glass border border-cyan-500/10 clip-card p-6 space-y-4">
      <div className="flex justify-between">
        <Skeleton className="h-4 w-24 rounded" />
        <Skeleton className="h-5 w-16 rounded" />
      </div>
      <Skeleton className="h-28 w-full rounded" />
      <Skeleton className="h-5 w-36 rounded" />
      <Skeleton className="h-3 w-24 rounded" />
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i}>
            <div className="flex justify-between mb-1">
              <Skeleton className="h-2.5 w-16 rounded" />
              <Skeleton className="h-2.5 w-8 rounded" />
            </div>
            <Skeleton className="h-1 w-full rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function CharacterCardSkeleton() {
  return (
    <div className="glass border border-cyan-500/10 clip-card overflow-hidden h-96">
      <Skeleton className="h-72 w-full" />
      <div className="p-5 space-y-2">
        <Skeleton className="h-5 w-28 rounded" />
        <Skeleton className="h-3 w-20 rounded" />
      </div>
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="min-h-screen bg-dark-DEFAULT pt-20 px-6 animate-pulse">
      <div className="max-w-7xl mx-auto">
        <div className="h-8 bg-cyan-500/10 rounded w-48 mb-2" />
        <div className="h-16 bg-cyan-500/5 rounded w-64 mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <WeaponCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function CharacterDetailSkeleton() {
  return (
    <div className="min-h-screen bg-dark-DEFAULT pt-20 px-6">
      <div className="max-w-7xl mx-auto py-8">
        <Skeleton className="h-5 w-48 mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Skeleton className="aspect-[3/4] clip-card" />
          <div className="space-y-6">
            <div>
              <Skeleton className="h-6 w-24 mb-2" />
              <Skeleton className="h-12 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/3" />
            </div>
            <Skeleton className="h-20 w-full" />
            <div className="space-y-3">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
            </div>
            <Skeleton className="h-14 w-full mt-4" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function WeaponDetailSkeleton() {
  return (
    <div className="min-h-screen bg-dark-DEFAULT pt-20 px-6">
      <div className="max-w-7xl mx-auto py-8">
        <Skeleton className="h-5 w-48 mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Skeleton className="aspect-square clip-card" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
            <div className="pt-4">
              <Skeleton className="h-5 w-32 mb-4" />
              <div className="space-y-3">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
              </div>
            </div>
            <Skeleton className="h-12 w-full mt-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
