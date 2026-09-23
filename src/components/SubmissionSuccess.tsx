import React, { useRef } from 'react';
import { 
  CheckCircle2, 
  Printer, 
  PlusCircle
} from 'lucide-react';
import { VoiceCandidate } from '../types';

interface SubmissionSuccessProps {
  candidate: VoiceCandidate;
  onNewSubmission: () => void;
  onViewJury: () => void;
}

export const SubmissionSuccess: React.FC<SubmissionSuccessProps> = ({
  candidate,
  onNewSubmission,
  onViewJury,
}) => {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <div 
        ref={printRef}
        className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-10 shadow-lg text-center"
      >
        {/* Success Header */}
        <div className="pb-6">
          <div className="mx-auto mb-4 flex justify-center">
            <img
              src="/logo.jpg"
              alt="Logo Officiel Casting"
              className="h-20 w-auto max-w-[150px] rounded-xl object-contain bg-white shadow-sm border border-slate-200/90 p-1"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 shadow-xs ring-6 ring-emerald-50">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          
          <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200/80 mb-2">
            Candidature Enregistrée avec Succès
          </span>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Votre dossier d'audition est validé !
          </h2>
          <p className="mt-2 text-sm text-slate-600 max-w-lg mx-auto">
            Merci <strong className="text-slate-900">{candidate.firstName} {candidate.lastName}</strong>. 
            Votre dossier a été transmis au comité de sélection vocale.
          </p>

          {/* Dossier Code Card */}
          <div className="mt-6 inline-flex flex-col sm:flex-row items-center gap-3 rounded-xl border border-indigo-100 bg-indigo-50/80 px-6 py-4 shadow-xs">
            <span className="text-xs font-medium uppercase tracking-wider text-indigo-700">
              Numéro de Dossier Officiel :
            </span>
            <span className="font-mono text-2xl font-bold text-indigo-950 tracking-wider">
              {candidate.registrationNumber}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            id="btn-print-receipt"
            onClick={handlePrint}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <Printer className="h-4 w-4 text-slate-500" />
            Imprimer / Télécharger le récépissé
          </button>

          <button
            type="button"
            id="btn-new-candidacy"
            onClick={onNewSubmission}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-indigo-700 transition-colors cursor-pointer"
          >
            <PlusCircle className="h-4 w-4" />
            Nouvelle inscription
          </button>
        </div>

      </div>
    </div>
  );
};
