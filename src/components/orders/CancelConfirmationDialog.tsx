import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

interface CancelConfirmationDialogProps {
  open: boolean;
  orderId: string | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export const CancelConfirmationDialog = ({
  open,
  orderId,
  onConfirm,
  onCancel,
}: CancelConfirmationDialogProps) => {
  if (!open) return null;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          
          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-6 pointer-events-none"
          >
            <div className="bg-card rounded-[2.5rem] p-6 max-w-[340px] w-full border border-border shadow-2xl pointer-events-auto">
              {/* Warning Icon */}
              <div className="w-16 h-16 bg-brand-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle size={32} className="text-brand-red" />
              </div>

              {/* Content */}
              <div className="text-center mb-6">
                <h3 className="text-xl font-display font-bold text-foreground mb-2">
                  Cancel Order?
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  This action cannot be undone. Are you sure you want to cancel order{' '}
                  <span className="font-bold text-foreground">{orderId}</span>?
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3">
                <Button
                  onClick={onCancel}
                  variant="outline"
                  className="h-12 rounded-2xl font-bold text-sm"
                >
                  Keep Order
                </Button>
                <Button
                  onClick={onConfirm}
                  className="h-12 rounded-2xl bg-brand-red text-white hover:bg-brand-red/90 font-bold text-sm"
                >
                  Yes, Cancel Order
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
