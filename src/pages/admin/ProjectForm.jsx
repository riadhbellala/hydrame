import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Upload, X, Loader2, Save } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import imageCompression from 'browser-image-compression';

export default function ProjectForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(isEditMode);
  const [error, setError] = useState(null);
  
  // Form State
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    subtitle: '',
    duration: '',
    collaboration: '',
    location: '',
    description: '',
    tags: '', // will be converted to array on save
    published: false,
    metrics: [{ label: '', value: '' }]
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (isEditMode) {
      fetchProject();
    }
  }, [id]);

  const fetchProject = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      
      setFormData({
        title: data.title || '',
        category: data.category || '',
        subtitle: data.subtitle || '',
        duration: data.duration || '',
        collaboration: data.collaboration || '',
        location: data.location || '',
        description: data.description || '',
        tags: Array.isArray(data.tags) ? data.tags.join(', ') : '',
        published: !!data.published,
        metrics: Array.isArray(data.metrics) && data.metrics.length > 0 ? data.metrics : [{ label: '', value: '' }]
      });
      
      if (data.cover_image) {
        setImagePreview(data.cover_image);
      }
    } catch (err) {
      setError(`Erreur de chargement: ${err.message}`);
    } finally {
      setIsFetching(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleMetricChange = (index, field, value) => {
    const newMetrics = [...formData.metrics];
    newMetrics[index][field] = value;
    setFormData(prev => ({ ...prev, metrics: newMetrics }));
  };

  const addMetric = () => {
    setFormData(prev => ({ ...prev, metrics: [...prev.metrics, { label: '', value: '' }] }));
  };

  const removeMetric = (index) => {
    setFormData(prev => ({ ...prev, metrics: prev.metrics.filter((_, i) => i !== index) }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      // Create local preview instantly
      setImagePreview(URL.createObjectURL(file));
      
      // Compress image
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true
      };
      
      const compressedFile = await imageCompression(file, options);
      setImageFile(compressedFile);
    } catch (error) {
      setError(`Erreur de compression d'image: ${error.message}`);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      let cover_image_url = imagePreview;

      // Upload image if a new file is selected
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
        const filePath = `covers/${fileName}`;

        const { error: uploadError, data: uploadData } = await supabase.storage
          .from('projects')
          .upload(filePath, imageFile);

        if (uploadError) throw uploadError;

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('projects')
          .getPublicUrl(filePath);
          
        cover_image_url = publicUrl;
      }

      // Process tags
      const processedTags = formData.tags
        .split(',')
        .map(t => t.trim())
        .filter(t => t.length > 0);

      // Clean empty metrics
      const cleanedMetrics = formData.metrics.filter(m => m.label.trim() !== '' || m.value.trim() !== '');

      const projectData = {
        title: formData.title,
        category: formData.category,
        subtitle: formData.subtitle,
        duration: formData.duration,
        collaboration: formData.collaboration,
        location: formData.location,
        description: formData.description,
        tags: processedTags,
        published: formData.published,
        metrics: cleanedMetrics,
        cover_image: cover_image_url,
      };

      if (isEditMode) {
        const { error } = await supabase
          .from('projects')
          .update(projectData)
          .eq('id', id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('projects')
          .insert([projectData]);
        if (error) throw error;
      }

      navigate('/admin/dashboard');
    } catch (err) {
      setError(`Erreur d'enregistrement: ${err.message}`);
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-green-500" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto w-full font-body pb-12">
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate('/admin/dashboard')}
          className="p-2 text-slate-500 hover:text-ink-900 hover:bg-slate-100 rounded-xl transition-colors"
          title="Retour aux projets"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="font-heading text-3xl font-bold text-ink-900">
          {isEditMode ? 'Modifier le projet' : 'Nouveau projet'}
        </h1>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-200 rounded-xl text-red-600 text-sm">
          {error}
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/60 shadow-[0_4px_20px_rgba(0,0,0,0.02)] p-8"
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          
          {/* IMAGE UPLOAD SECTION */}
          <div className="flex flex-col gap-3">
            <label className="font-semibold text-ink-900 text-sm">Image de couverture</label>
            <div className="relative border-2 border-dashed border-slate-300 rounded-2xl overflow-hidden bg-slate-50 hover:bg-slate-100 transition-colors">
              {imagePreview ? (
                <div className="relative w-full aspect-video md:aspect-[21/9]">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-md rounded-full text-red-600 hover:bg-red-50 transition-colors shadow-sm"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full py-16 cursor-pointer">
                  <Upload className="w-10 h-10 text-slate-400 mb-3" />
                  <p className="text-sm font-medium text-ink-900">Cliquez pour télécharger une image</p>
                  <p className="text-xs text-slate-500 mt-1">JPG, PNG (Compressé automatiquement avant l'envoi)</p>
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden" 
                  />
                </label>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Titre */}
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-ink-900 text-sm">Titre</label>
              <input
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all bg-white border border-slate-200 text-ink-900 placeholder-slate-400 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 shadow-sm"
                placeholder="Ex: Aménagement Hydraulique..."
              />
            </div>
            
            {/* Sous-titre */}
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-ink-900 text-sm">Sous-titre (Surligné)</label>
              <input
                name="subtitle"
                value={formData.subtitle}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all bg-white border border-slate-200 text-ink-900 placeholder-slate-400 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 shadow-sm"
                placeholder="Ex: PROTECTION CONTRE LES INONDATIONS"
              />
            </div>

            {/* Catégorie */}
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-ink-900 text-sm">Catégorie</label>
              <input
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all bg-white border border-slate-200 text-ink-900 placeholder-slate-400 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 shadow-sm"
                placeholder="Ex: Hydraulique, Infrastructure..."
              />
            </div>

            {/* Tags */}
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-ink-900 text-sm">Mots-clés (séparés par des virgules)</label>
              <input
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all bg-white border border-slate-200 text-ink-900 placeholder-slate-400 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 shadow-sm"
                placeholder="Ex: Barrage, Étude, Modélisation 3D"
              />
            </div>

            {/* Localisation */}
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-ink-900 text-sm">Localisation</label>
              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all bg-white border border-slate-200 text-ink-900 placeholder-slate-400 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 shadow-sm"
                placeholder="Ex: Alger, Algérie"
              />
            </div>

            {/* Durée */}
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-ink-900 text-sm">Durée / Année</label>
              <input
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all bg-white border border-slate-200 text-ink-900 placeholder-slate-400 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 shadow-sm"
                placeholder="Ex: 24 Mois, ou 2023-2024"
              />
            </div>

            {/* Collaboration */}
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="font-semibold text-ink-900 text-sm">Client / Partenaire</label>
              <input
                name="collaboration"
                value={formData.collaboration}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all bg-white border border-slate-200 text-ink-900 placeholder-slate-400 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 shadow-sm"
                placeholder="Ex: Ministère des Ressources en Eau"
              />
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-ink-900 text-sm">Description détaillée</label>
            <textarea
              name="description"
              required
              rows={5}
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all bg-white border border-slate-200 text-ink-900 placeholder-slate-400 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 shadow-sm resize-none"
              placeholder="Décrivez les enjeux, les solutions apportées et l'impact de ce projet..."
            />
          </div>

          {/* Metrics */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-ink-900 text-sm">Métriques clés</label>
              <button 
                type="button" 
                onClick={addMetric}
                className="text-xs font-semibold text-green-600 hover:text-green-700 bg-green-50 hover:bg-green-100 px-3 py-1.5 rounded-lg transition-colors"
              >
                + Ajouter une métrique
              </button>
            </div>
            
            {formData.metrics.map((metric, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <input
                  value={metric.label}
                  onChange={(e) => handleMetricChange(idx, 'label', e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl text-sm outline-none transition-all bg-white border border-slate-200 text-ink-900 placeholder-slate-400 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 shadow-sm"
                  placeholder="Label (ex: CAPACITÉ)"
                />
                <input
                  value={metric.value}
                  onChange={(e) => handleMetricChange(idx, 'value', e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl text-sm outline-none transition-all bg-white border border-slate-200 text-ink-900 placeholder-slate-400 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 shadow-sm"
                  placeholder="Valeur (ex: 1200 m³/s)"
                />
                <button
                  type="button"
                  onClick={() => removeMetric(idx)}
                  className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-200 pt-6 mt-2 flex items-center justify-between">
            <label className="flex items-center gap-3 cursor-pointer">
              <div className="relative">
                <input 
                  type="checkbox" 
                  name="published"
                  checked={formData.published}
                  onChange={handleChange}
                  className="sr-only" 
                />
                <div className={`block w-12 h-7 rounded-full transition-colors ${formData.published ? 'bg-green-500' : 'bg-slate-300'}`}></div>
                <div className={`absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-transform ${formData.published ? 'translate-x-5' : 'translate-x-0'}`}></div>
              </div>
              <span className="font-semibold text-ink-900 text-sm">
                Publier ce projet publiquement
              </span>
            </label>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary py-3 px-8 rounded-xl shadow-lg shadow-green-500/20 hover:shadow-green-500/30 disabled:opacity-70 disabled:cursor-not-allowed text-sm"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Enregistrement...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Enregistrer
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
