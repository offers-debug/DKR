
import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Maximize, 
  Home as HomeIcon, 
  Navigation, 
  Banknote, 
  FileText, 
  Sparkles,
  ClipboardCopy,
  CheckCircle,
  Loader2,
  Car,
  ChevronRight,
  User,
  Bell,
  ArrowRight
} from 'lucide-react';
import { initialFormData, PropertyFormData } from './types';
import { generateRealEstateAd } from './services/geminiService';
import FormSection from './components/FormSection';
import { Input, Select, Checkbox } from './components/InputFields';

type ViewState = 'home' | 'form';
type PropertyType = 'showroom' | 'land';

function App() {
  const [view, setView] = useState<ViewState>('home');
  const [propertyType, setPropertyType] = useState<PropertyType>('showroom');
  const [formData, setFormData] = useState<PropertyFormData>(initialFormData);
  const [generatedAd, setGeneratedAd] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleStart = (type: PropertyType) => {
    setPropertyType(type);
    setFormData(prev => ({ ...prev, propertyCategory: type }));
    setView('form');
    setGeneratedAd('');
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setView('home');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setGeneratedAd('');
    
    // Smooth scroll to bottom
    setTimeout(() => {
        const resultElement = document.getElementById('result-section');
        if (resultElement) resultElement.scrollIntoView({ behavior: 'smooth' });
    }, 100);

    const result = await generateRealEstateAd(formData);
    setGeneratedAd(result);
    setIsLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedAd);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20 font-tajawal">
      
      {/* Header */}
      <header className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center shadow-md">
                <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-white" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 7l-2-4H4L2 7v10h20V7z" />
                  <path d="M12 17v4" />
                  <path d="M8 17v4" />
                  <path d="M16 17v4" />
                </svg>
             </div>
             <div className="hidden md:block">
               <h1 className="text-lg font-bold text-white tracking-wide">فارس الصحراء العقارية</h1>
               <p className="text-amber-500 text-xs">نظام توليد العروض الذكي</p>
             </div>
             <div className="md:hidden">
               <h1 className="text-lg font-bold text-white">فارس الصحراء</h1>
             </div>
          </div>
          
          <div className="flex items-center gap-3">
             <button className="p-2 rounded-full hover:bg-slate-800 transition text-slate-300 relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-slate-900"></span>
             </button>
             <button className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center hover:bg-slate-600 transition border border-slate-600">
                <User className="w-4 h-4 text-amber-500" />
             </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 max-w-5xl">
        
        {view === 'home' && (
          <div className="animate-fade-in space-y-8">
            <div className="text-center py-8">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">مرحباً، لنصنع <span className="text-amber-600 relative inline-block">
                محتوى عقارياً مميزاً
                <svg className="absolute w-full h-2 bottom-0 left-0 text-amber-200/50 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" /></svg>
              </span> اليوم</h2>
              <p className="text-slate-500 max-w-lg mx-auto">اختر نوع العقار للبدء في صياغة عرض احترافي باستخدام الذكاء الاصطناعي</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* Showroom Card */}
              <div className="bg-slate-900 rounded-2xl p-8 text-white shadow-xl transform transition hover:-translate-y-1 hover:shadow-2xl group cursor-pointer relative overflow-hidden" onClick={() => handleStart('showroom')}>
                <div className="absolute top-0 right-0 w-64 h-64 bg-slate-800 rounded-full -mr-32 -mt-32 opacity-20 group-hover:scale-110 transition-transform duration-500"></div>
                <div className="relative z-10 flex flex-col h-full items-start">
                  <div className="bg-slate-800 p-4 rounded-xl mb-6 group-hover:bg-slate-700 transition-colors border border-slate-700">
                    <Car className="w-10 h-10 text-amber-500" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">معرض سيارات (فيديو)</h3>
                  <p className="text-slate-300 mb-8 leading-relaxed text-sm">
                    توليد سكريبت فيديو لمعارض السيارات يركز على الموقع، الشوارع، والمواصفات.
                  </p>
                  <button className="mt-auto bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-8 rounded-xl transition-colors flex items-center gap-2 w-full justify-center group-hover:shadow-lg group-hover:shadow-amber-900/20">
                    ابدأ الآن
                    <ChevronRight className="w-4 h-4 transform rotate-180" />
                  </button>
                </div>
              </div>

              {/* Land Card */}
              <div className="bg-white rounded-2xl p-8 text-slate-900 shadow-xl border border-slate-200 transform transition hover:-translate-y-1 hover:shadow-2xl group cursor-pointer relative overflow-hidden" onClick={() => handleStart('land')}>
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-50 rounded-full -mr-32 -mt-32 opacity-50 group-hover:scale-110 transition-transform duration-500"></div>
                <div className="relative z-10 flex flex-col h-full items-start">
                   <div className="bg-amber-50 p-4 rounded-xl mb-6 group-hover:bg-amber-100 transition-colors border border-amber-100">
                    <MapPin className="w-10 h-10 text-amber-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">أرض فضاء</h3>
                  <p className="text-slate-500 mb-8 leading-relaxed text-sm">
                    صياغة إعلان لأراضي استثمارية مع التركيز على الأطوال، الواجهات، وفرص التطوير.
                  </p>
                  <button className="mt-auto bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-8 rounded-xl transition-colors flex items-center gap-2 w-full justify-center group-hover:shadow-lg">
                    ابدأ الآن
                    <ChevronRight className="w-4 h-4 transform rotate-180" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {view === 'form' && (
          <div className="animate-fade-in-up">
            <button onClick={handleBack} className="flex items-center gap-2 text-slate-500 hover:text-amber-600 mb-6 transition-colors font-medium">
              <ChevronRight className="w-5 h-5" />
              العودة للرئيسية
            </button>

            <div className="flex flex-col md:flex-row gap-6 mb-8 items-start">
               <div className={`p-3 rounded-xl ${propertyType === 'showroom' ? 'bg-slate-900 text-amber-500' : 'bg-white border text-amber-600'}`}>
                 {propertyType === 'showroom' ? <Car className="w-8 h-8" /> : <MapPin className="w-8 h-8" />}
               </div>
               <div>
                 <h2 className="text-2xl font-bold text-slate-800">
                   {propertyType === 'showroom' ? 'بيانات معرض السيارات' : 'بيانات الأرض'}
                 </h2>
                 <p className="text-slate-500 text-sm mt-1">قم بتعبئة النموذج ليتم تحويله إلى محتوى {propertyType === 'showroom' ? 'فيديو' : 'نصي'} متكامل</p>
               </div>
            </div>

            <form onSubmit={handleSubmit}>
              
              {/* --- SHOWROOM FORM --- */}
              {propertyType === 'showroom' && (
                <>
                  <FormSection title="الموقع والمساحة" icon={<MapPin className="w-5 h-5" />}>
                     <Select 
                      label="المدينة" 
                      name="city" 
                      value={formData.city} 
                      onChange={handleChange}
                      options={['الرياض', 'جدة', 'الدمام', 'أخرى']} 
                    />
                    <Input 
                      label="الحي" 
                      name="district" 
                      placeholder="مثال: القادسية" 
                      value={formData.district} 
                      onChange={handleChange} 
                    />
                    <Input 
                      label="المساحة (م²)" 
                      name="area" 
                      type="number"
                      placeholder="مثال: 3000" 
                      value={formData.area} 
                      onChange={handleChange} 
                    />
                  </FormSection>

                  <FormSection title="الشوارع والواجهة" icon={<Navigation className="w-5 h-5" />}>
                     <Input 
                      label="عدد الشوارع" 
                      name="showroomStreetsCount" 
                      placeholder="مثال: شارعين" 
                      value={formData.showroomStreetsCount} 
                      onChange={handleChange} 
                    />
                     <Input 
                      label="عرض الشوارع (م)" 
                      name="showroomStreetsWidth" 
                      placeholder="مثال: 40-20" 
                      value={formData.showroomStreetsWidth} 
                      onChange={handleChange} 
                    />
                     <Input 
                      label="الواجهة والاتجاه" 
                      name="showroomFacing" 
                      placeholder="مثال: شرقي غربي" 
                      value={formData.showroomFacing} 
                      onChange={handleChange} 
                    />
                  </FormSection>

                  <FormSection title="المواصفات والمرافق" icon={<Building2 className="w-5 h-5" />}>
                     <Input 
                      label="سعة المعرض (سيارة)" 
                      name="showroomCapacity" 
                      placeholder="مثال: 150" 
                      type="number"
                      value={formData.showroomCapacity} 
                      onChange={handleChange} 
                    />
                    <div className="col-span-full grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <span className="col-span-full font-bold text-sm text-slate-700 mb-2">المرافق المتوفرة:</span>
                      <Checkbox label="مكاتب موظفين" name="hasOffices" checked={formData.hasOffices} onChange={handleChange} />
                      <Checkbox label="مجلس عملاء" name="hasLounge" checked={formData.hasLounge} onChange={handleChange} />
                      <Checkbox label="مطبخ" name="hasKitchen" checked={formData.hasKitchen} onChange={handleChange} />
                    </div>
                  </FormSection>

                  <FormSection title="شبكة الطرق والربط" icon={<Navigation className="w-5 h-5" />}>
                     <Input 
                      label="يقع المعرض على شارع" 
                      name="siteStreetName" 
                      placeholder="مثال: وادي الرمة" 
                      value={formData.siteStreetName} 
                      onChange={handleChange} 
                    />
                    
                    <div className="col-span-full h-px bg-slate-100 my-2"></div>
                    
                    <Input 
                      label="الطريق المتصل الأول" 
                      name="road1Name" 
                      placeholder="مثال: طريق الدمام" 
                      value={formData.road1Name} 
                      onChange={handleChange} 
                    />
                    <Input 
                      label="اتجاه الطريق الأول" 
                      name="road1Dir" 
                      placeholder="مثال: الشمالية" 
                      value={formData.road1Dir} 
                      onChange={handleChange} 
                    />

                    <div className="col-span-full h-px bg-slate-100 my-2"></div>

                     <Input 
                      label="الطريق المتصل الثاني" 
                      name="road2Name" 
                      placeholder="مثال: طريق الإمام عبدالله" 
                      value={formData.road2Name} 
                      onChange={handleChange} 
                    />
                    <Input 
                      label="اتجاه الطريق الثاني" 
                      name="road2Dir" 
                      placeholder="مثال: الجنوبية" 
                      value={formData.road2Dir} 
                      onChange={handleChange} 
                    />

                    <div className="col-span-full h-px bg-slate-100 my-2"></div>

                    <Input 
                      label="الطريق المتصل الثالث (اختياري)" 
                      name="road3Name" 
                      placeholder="مثال: طريق وادي الدواسر" 
                      value={formData.road3Name} 
                      onChange={handleChange} 
                    />
                    <Input 
                      label="اتجاه الطريق الثالث (اختياري)" 
                      name="road3Dir" 
                      placeholder="مثال: شرقية والغربية" 
                      value={formData.road3Dir} 
                      onChange={handleChange} 
                    />
                  </FormSection>
                </>
              )}

              {/* --- LAND FORM (Legacy) --- */}
              {propertyType === 'land' && (
                <>
                  <FormSection title="حالة العرض" icon={<HomeIcon className="w-5 h-5" />}>
                    <Select 
                      label="نوع العرض" 
                      name="offerType" 
                      value={formData.offerType} 
                      onChange={handleChange}
                      options={['بيع', 'إيجار', 'بيع مع مستأجر']} 
                    />
                    <Select 
                      label="الحالة التشغيلية" 
                      name="operationalStatus" 
                      value={formData.operationalStatus} 
                      onChange={handleChange}
                      options={['جاهز', 'مؤجّر', 'تحت الاستخدام', 'خالٍ']} 
                    />
                  </FormSection>

                  <FormSection title="الموقع" icon={<MapPin className="w-5 h-5" />}>
                    <Select 
                      label="المدينة" 
                      name="city" 
                      value={formData.city} 
                      onChange={handleChange}
                      options={['الرياض', 'جدة', 'الدمام', 'أخرى']} 
                    />
                    <Input 
                      label="الحي" 
                      name="district" 
                      placeholder="مثال: القادسية" 
                      value={formData.district} 
                      onChange={handleChange} 
                    />
                    <Select 
                      label="وصف داخل الحي" 
                      name="districtDesc" 
                      value={formData.districtDesc} 
                      onChange={handleChange}
                      options={['سنتر السوق', 'واجهة تجارية', 'زاوية', 'داخل كتلة المعارض', 'أخرى']} 
                    />
                    <Input 
                      label="قرب معالم رئيسية" 
                      name="landmarks" 
                      placeholder="مثال: قريب من السنتر" 
                      value={formData.landmarks} 
                      onChange={handleChange} 
                    />
                  </FormSection>

                  <FormSection title="بيانات الأرض" icon={<Maximize className="w-5 h-5" />}>
                    <Input label="المساحة الإجمالية (م²)" name="area" type="number" value={formData.area} onChange={handleChange} />
                    <Input label="طول القطعة (م)" name="length" type="number" value={formData.length} onChange={handleChange} />
                    <Input label="عرض القطعة (م)" name="width" type="number" value={formData.width} onChange={handleChange} />
                    <Select label="اتجاه الواجهة الرئيسية" name="facing" value={formData.facing} onChange={handleChange} options={['شمال', 'جنوب', 'شرق', 'غرب']} />
                    <Select label="عدد الشوارع المحيطة" name="streetsCount" value={formData.streetsCount} onChange={handleChange} options={['1', '2', '3', '4']} />
                    <Input label="عرض الشارع الرئيسي (م)" name="mainStreetWidth" type="number" value={formData.mainStreetWidth} onChange={handleChange} />
                    <Select label="اتجاه الشارع الرئيسي" name="mainStreetDir" value={formData.mainStreetDir} onChange={handleChange} options={['شمالي', 'جنوبي', 'شرقي', 'غربي']} />
                  </FormSection>
                  
                   <FormSection title="الشروط التجارية" icon={<Banknote className="w-5 h-5" />}>
                    <Input label="سعر البيع المطلوب (ريال)" name="price" type="number" value={formData.price} onChange={handleChange} />
                    <Select label="قابل للتفاوض" name="negotiable" value={formData.negotiable} onChange={handleChange} options={['نعم', 'لا', 'حسب الجدية']} />
                  </FormSection>
                </>
              )}

              <div className="flex justify-center mt-8 mb-12">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 px-12 rounded-xl shadow-lg transform transition hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 text-lg w-full md:w-auto justify-center border border-amber-500/30"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin w-6 h-6 text-amber-500" />
                      جارٍ كتابة المحتوى...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-6 h-6 text-amber-500" />
                      توليد المحتوى
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Result Area */}
            {generatedAd && (
              <div id="result-section" className="animate-fade-in-up bg-white rounded-2xl shadow-xl border border-slate-200 p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-2 bg-gradient-to-l from-slate-900 via-amber-600 to-slate-900"></div>
                <div className="absolute top-6 left-6 z-10">
                  <button
                    onClick={handleCopy}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all shadow-sm ${
                      isCopied 
                        ? 'bg-green-600 text-white' 
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        تم النسخ
                      </>
                    ) : (
                      <>
                        <ClipboardCopy className="w-4 h-4" />
                        نسخ النص
                      </>
                    )}
                  </button>
                </div>
                
                <h2 className="text-2xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4 flex items-center gap-2">
                  <span className="text-amber-600">✦</span> النص المولد
                </h2>
                
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                    <div className="prose prose-lg max-w-none text-slate-800 whitespace-pre-line leading-relaxed font-medium">
                    {generatedAd}
                    </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
      
      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 py-3 px-6 md:hidden z-50">
          <div className="flex justify-around items-center">
              <button className="flex flex-col items-center gap-1 text-amber-600" onClick={() => setView('home')}>
                  <HomeIcon className="w-6 h-6" />
                  <span className="text-[10px] font-bold">الرئيسية</span>
              </button>
              <button className="flex flex-col items-center gap-1 text-slate-400">
                  <FileText className="w-6 h-6" />
                  <span className="text-[10px]">مسوداتي</span>
              </button>
              <div className="w-10"></div>
              <button className="flex flex-col items-center gap-1 text-slate-400">
                  <User className="w-6 h-6" />
                  <span className="text-[10px]">حسابي</span>
              </button>
          </div>
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-slate-900 p-3 rounded-full shadow-lg border-4 border-slate-50 text-white cursor-pointer" onClick={() => setView('home')}>
              <Sparkles className="w-6 h-6" />
          </div>
      </div>

    </div>
  );
}

export default App;
