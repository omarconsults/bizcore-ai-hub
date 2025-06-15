
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Server, Database, Cpu, HardDrive, Wifi, AlertCircle, CheckCircle, RefreshCw } from 'lucide-react';

const SystemMonitoring = () => {
  const [systemStats, setSystemStats] = useState({
    serverStatus: 'online',
    databaseStatus: 'online',
    apiStatus: 'online',
    cdnStatus: 'online',
    cpuUsage: 45,
    memoryUsage: 62,
    diskUsage: 78,
    activeUsers: 234,
    apiCalls: 12456,
    errorRate: 0.2
  });

  const [lastUpdated, setLastUpdated] = useState(new Date());

  const refreshStats = () => {
    // Simulate real-time data updates
    setSystemStats(prev => ({
      ...prev,
      cpuUsage: Math.floor(Math.random() * 40) + 30,
      memoryUsage: Math.floor(Math.random() * 30) + 50,
      diskUsage: Math.floor(Math.random() * 20) + 70,
      activeUsers: Math.floor(Math.random() * 100) + 200,
      apiCalls: Math.floor(Math.random() * 5000) + 10000,
      errorRate: (Math.random() * 2).toFixed(1)
    }));
    setLastUpdated(new Date());
  };

  useEffect(() => {
    const interval = setInterval(refreshStats, 30000); // Auto-refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const services = [
    { name: 'Web Server', status: systemStats.serverStatus, icon: Server },
    { name: 'Database', status: systemStats.databaseStatus, icon: Database },
    { name: 'API Gateway', status: systemStats.apiStatus, icon: Wifi },
    { name: 'CDN', status: systemStats.cdnStatus, icon: HardDrive }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">System Monitoring</h1>
          <p className="text-gray-600">Real-time system health and performance metrics</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </span>
          <Button onClick={refreshStats} variant="outline" size="sm">
            <RefreshCw size={16} className="mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Service Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {services.map((service) => (
          <Card key={service.name}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <service.icon size={20} className="text-gray-600" />
                  <span className="font-medium text-gray-900">{service.name}</span>
                </div>
                <Badge variant={service.status === 'online' ? 'default' : 'destructive'}>
                  {service.status === 'online' ? (
                    <CheckCircle size={12} className="mr-1" />
                  ) : (
                    <AlertCircle size={12} className="mr-1" />
                  )}
                  {service.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cpu size={20} />
              System Resources
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>CPU Usage</span>
                <span>{systemStats.cpuUsage}%</span>
              </div>
              <Progress value={systemStats.cpuUsage} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Memory Usage</span>
                <span>{systemStats.memoryUsage}%</span>
              </div>
              <Progress value={systemStats.memoryUsage} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Disk Usage</span>
                <span>{systemStats.diskUsage}%</span>
              </div>
              <Progress value={systemStats.diskUsage} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Real-time Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Active Users</span>
              <span className="font-semibold text-emerald-600">{systemStats.activeUsers}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">API Calls/hour</span>
              <span className="font-semibold text-blue-600">{systemStats.apiCalls.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Error Rate</span>
              <span className="font-semibold text-red-600">{systemStats.errorRate}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Uptime</span>
              <span className="font-semibold text-gray-900">99.9%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-2 p-2 bg-yellow-50 rounded-lg">
                <AlertCircle size={16} className="text-yellow-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-800">High Disk Usage</p>
                  <p className="text-xs text-yellow-600">Disk usage at 78% - consider cleanup</p>
                </div>
              </div>
              <div className="flex items-start gap-2 p-2 bg-green-50 rounded-lg">
                <CheckCircle size={16} className="text-green-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-green-800">All Services Operational</p>
                  <p className="text-xs text-green-600">No critical issues detected</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Log */}
      <Card>
        <CardHeader>
          <CardTitle>Recent System Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { time: '14:32', event: 'Database backup completed successfully', type: 'info' },
              { time: '14:15', event: 'User authentication service restarted', type: 'warning' },
              { time: '13:45', event: 'API rate limit increased for peak hours', type: 'info' },
              { time: '13:20', event: 'Disk cleanup task completed - 2.3GB freed', type: 'success' },
              { time: '12:58', event: 'SSL certificate renewed automatically', type: 'success' }
            ].map((log, index) => (
              <div key={index} className="flex items-center gap-3 p-2 border-l-2 border-gray-200">
                <span className="text-xs text-gray-500 w-12">{log.time}</span>
                <div className={`w-2 h-2 rounded-full ${
                  log.type === 'success' ? 'bg-green-500' :
                  log.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                }`} />
                <span className="text-sm text-gray-700">{log.event}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemMonitoring;
