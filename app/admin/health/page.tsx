"use client";

import { useState, useEffect } from 'react';
import { Shield, CheckCircle, AlertTriangle, Server, Zap, Database, Globe, HardDrive } from 'lucide-react';

interface HealthCheck {
    name: string;
    status: 'healthy' | 'warning' | 'error';
    message: string;
    icon: any;
}

export default function HealthCheckPage() {
    const [checks, setChecks] = useState<HealthCheck[]>([]);
    const [lastChecked, setLastChecked] = useState<string>('');
    const [isChecking, setIsChecking] = useState(false);

    const runHealthChecks = () => {
        setIsChecking(true);

        setTimeout(() => {
            const results: HealthCheck[] = [];

            // Check localStorage availability
            if (typeof window !== 'undefined') {
                try {
                    localStorage.setItem('test', 'test');
                    localStorage.removeItem('test');
                    results.push({
                        name: 'Local Storage',
                        status: 'healthy',
                        message: 'Working properly',
                        icon: Database,
                    });
                } catch (e) {
                    results.push({
                        name: 'Local Storage',
                        status: 'error',
                        message: 'Not available or full',
                        icon: Database,
                    });
                }

                // Check data integrity
                const blogs = JSON.parse(localStorage.getItem('blogs') || '[]');
                const tools = JSON.parse(localStorage.getItem('tools') || '[]');
                const totalData = blogs.length + tools.length;

                results.push({
                    name: 'Data Integrity',
                    status: totalData > 0 ? 'healthy' : 'warning',
                    message: totalData > 0 ? `${totalData} items stored` : 'No data found',
                    icon: HardDrive,
                });
            } else {
                results.push({
                    name: 'Local Storage',
                    status: 'warning',
                    message: 'Server Side',
                    icon: Database,
                });
            }

            // Check browser API availability
            const hasClipboard = !!navigator.clipboard;
            results.push({
                name: 'Clipboard API',
                status: hasClipboard ? 'healthy' : 'warning',
                message: hasClipboard ? 'Available' : 'Not supported',
                icon: Globe,
            });

            // Check performance
            const performance = window.performance;
            results.push({
                name: 'Performance API',
                status: performance ? 'healthy' : 'error',
                message: performance ? 'Available' : 'Not available',
                icon: Zap,
            });

            // Check storage usage
            if (navigator.storage && navigator.storage.estimate) {
                navigator.storage.estimate().then((estimate) => {
                    const usage = estimate.usage || 0;
                    const quota = estimate.quota || 0;
                    const percentUsed = (usage / quota) * 100;

                    results.push({
                        name: 'Storage Usage',
                        status: percentUsed < 80 ? 'healthy' : 'warning',
                        message: `${(usage / 1024 / 1024).toFixed(2)} MB used of ${(quota / 1024 / 1024).toFixed(2)} MB`,
                        icon: Server,
                    });

                    setChecks([...results]);
                });
            } else {
                results.push({
                    name: 'Storage Usage',
                    status: 'warning',
                    message: 'Cannot estimate storage',
                    icon: Server,
                });
                setChecks(results);
            }

            setLastChecked(new Date().toLocaleString());
            setIsChecking(false);
        }, 1000);
    };

    useEffect(() => {
        runHealthChecks();
    }, []);

    const healthyCount = checks.filter(c => c.status === 'healthy').length;
    const warningCount = checks.filter(c => c.status === 'warning').length;
    const errorCount = checks.filter(c => c.status === 'error').length;

    const overallStatus = errorCount > 0 ? 'error' : warningCount > 0 ? 'warning' : 'healthy';

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-4xl font-bold text-white mb-2">System Health</h1>
                    <p className="text-gray-400">Monitor your admin panel status</p>
                </div>
                <button
                    onClick={runHealthChecks}
                    disabled={isChecking}
                    className="px-6 py-3 rounded-full font-bold text-white bg-cyan-500 hover:bg-cyan-600 transition-colors shadow-lg shadow-cyan-500/50 flex items-center gap-2 disabled:opacity-50"
                >
                    <Shield className="w-5 h-5" />
                    {isChecking ? 'Checking...' : 'Run Check'}
                </button>
            </div>

            {/* Overall Status */}
            <div className={`glass-effect rounded-2xl p-8 mb-8 ${overallStatus === 'healthy' ? 'border border-green-500/30' :
                overallStatus === 'warning' ? 'border border-amber-500/30' :
                    'border border-red-500/30'
                }`}>
                <div className="flex items-center gap-4">
                    <div className={`p-4 rounded-xl ${overallStatus === 'healthy' ? 'bg-green-500/20' :
                        overallStatus === 'warning' ? 'bg-amber-500/20' :
                            'bg-red-500/20'
                        }`}>
                        <Shield className={`w-12 h-12 ${overallStatus === 'healthy' ? 'text-green-400' :
                            overallStatus === 'warning' ? 'text-amber-400' :
                                'text-red-400'
                            }`} />
                    </div>
                    <div>
                        <h2 className={`text-3xl font-bold ${overallStatus === 'healthy' ? 'text-green-400' :
                            overallStatus === 'warning' ? 'text-amber-400' :
                                'text-red-400'
                            }`}>
                            {overallStatus === 'healthy' ? 'System Healthy' :
                                overallStatus === 'warning' ? 'Minor Issues' :
                                    'Critical Issues'}
                        </h2>
                        <p className="text-gray-400">Last checked: {lastChecked}</p>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="glass-effect rounded-xl p-4">
                    <p className="text-gray-400 text-sm mb-1">Healthy</p>
                    <p className="text-2xl font-bold text-green-400">{healthyCount}</p>
                </div>
                <div className="glass-effect rounded-xl p-4">
                    <p className="text-gray-400 text-sm mb-1">Warnings</p>
                    <p className="text-2xl font-bold text-amber-400">{warningCount}</p>
                </div>
                <div className="glass-effect rounded-xl p-4">
                    <p className="text-gray-400 text-sm mb-1">Errors</p>
                    <p className="text-2xl font-bold text-red-400">{errorCount}</p>
                </div>
            </div>

            {/* Health Checks */}
            <div className="space-y-4">
                {checks.map((check, index) => {
                    const Icon = check.icon;
                    return (
                        <div
                            key={index}
                            className={`glass-effect rounded-xl p-6 border ${check.status === 'healthy' ? 'border-green-500/20' :
                                check.status === 'warning' ? 'border-amber-500/20' :
                                    'border-red-500/20'
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-xl ${check.status === 'healthy' ? 'bg-green-500/20' :
                                    check.status === 'warning' ? 'bg-amber-500/20' :
                                        'bg-red-500/20'
                                    }`}>
                                    <Icon className={`w-6 h-6 ${check.status === 'healthy' ? 'text-green-400' :
                                        check.status === 'warning' ? 'text-amber-400' :
                                            'text-red-400'
                                        }`} />
                                </div>

                                <div className="flex-1">
                                    <h3 className="text-white font-bold text-lg mb-1">{check.name}</h3>
                                    <p className="text-gray-400">{check.message}</p>
                                </div>

                                <div>
                                    {check.status === 'healthy' ? (
                                        <CheckCircle className="w-6 h-6 text-green-400" />
                                    ) : check.status === 'warning' ? (
                                        <AlertTriangle className="w-6 h-6 text-amber-400" />
                                    ) : (
                                        <AlertTriangle className="w-6 h-6 text-red-400" />
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Recommendations */}
            <div className="mt-8 glass-effect rounded-2xl p-6 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20">
                <h3 className="text-lg font-bold text-white mb-3">💡 Health Recommendations</h3>
                <ul className="space-y-2 text-gray-300">
                    <li>• Run health checks regularly to monitor system status</li>
                    <li>• Download backups if storage usage is high</li>
                    <li>• Clear old data periodically to free up space</li>
                    <li>• Keep browser updated for best performance</li>
                    <li>• Monitor for any critical errors and fix immediately</li>
                </ul>
            </div>
        </div>
    );
}
