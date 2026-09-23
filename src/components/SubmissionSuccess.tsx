import React, { useRef, useState } from 'react';
import { 
  CheckCircle2, 
  Download, 
  Send,
  PlusCircle,
  MailCheck
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
}) => {
  const printRef = useRef<HTMLDivElement>(null);
  const [hasClickedDownload, setHasClickedDownload] = useState(false);
  const [emailStatus, setEmailStatus] = useState<string | null>(null);

  const sendEmailReceipt = () => {
    const subject = `Récépissé Officiel - Casting Soirée des Restaurés 2026 - Dossier N° ${candidate.registrationNumber}`;
    const body = `Bonjour ${candidate.firstName} ${candidate.lastName},

Voici votre confirmation officielle d'inscription pour l'audition :

══════════════════════════════════════════
RÉCÉPISSÉ D'AUDITION OFFICIEL
SOIRÉE DES RESTAURÉS 2026
JF & Les Adorateurs du Tabernacle
══════════════════════════════════════════

• Numéro de dossier : ${candidate.registrationNumber}
• Nom & Prénom : ${candidate.lastName.toUpperCase()} ${candidate.firstName}
• Téléphone : ${candidate.phoneCountryCode} ${candidate.phone}
• Email : ${candidate.email}
• Église de provenance : ${candidate.churchCommunity}
• Pasteur référent : ${candidate.pastorName} (${candidate.pastorPhone})

DATE & HORAIRE DE L'AUDITION :
• Date : Samedi 03 Octobre 2026
• Heure de passage : 10H00

Important : Veuillez conserver ce récépissé et présenter votre numéro de dossier lors de votre audition.

Cordialement,
Le Comité d'Audition & Sélection Vocale
JF & Les Adorateurs du Tabernacle`;

    const mailtoUrl = `mailto:${encodeURIComponent(candidate.email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open mail client to send
    const link = document.createElement('a');
    link.href = mailtoUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setEmailStatus(`Récépissé envoyé par mail à ${candidate.email}`);
  };

  const handleAction = () => {
    if (!hasClickedDownload) {
      // First click on "Télécharger le récépissé":
      // 1. Send by email to the candidate's email
      sendEmailReceipt();
      // 2. Open print / download dialog
      setTimeout(() => {
        window.print();
      }, 300);
      // 3. Transform button into "Envoyer"
      setHasClickedDownload(true);
    } else {
      // Button is now "Envoyer": re-send or trigger mail send
      sendEmailReceipt();
    }
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

          {/* Notification status if sent */}
          {emailStatus && (
            <div className="mt-4 mx-auto max-w-md rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-xs text-emerald-800 flex items-center justify-center gap-2">
              <MailCheck className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>{emailStatus}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            id="btn-receipt-action"
            onClick={handleAction}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-xs font-semibold shadow-xs transition-all cursor-pointer ${
              hasClickedDownload
                ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            {hasClickedDownload ? (
              <>
                <Send className="h-4 w-4" />
                <span>Envoyer</span>
              </>
            ) : (
              <>
                <Download className="h-4 w-4 text-slate-500" />
                <span>Télécharger le récépissé</span>
              </>
            )}
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
