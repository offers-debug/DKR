
import React, { ReactNode } from 'react';

interface FormSectionProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
}

const FormSection: React.FC<FormSectionProps> = ({ title, icon, children }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8 mb-6 transition-all hover:shadow-md">
      <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
        <div className="bg-amber-50 p-2 rounded-lg text-amber-600">
            {icon}
        </div>
        <h3 className="text-lg font-bold text-slate-800">{title}</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {children}
      </div>
    </div>
  );
};

export default FormSection;
